const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllJobs = async (req, res, next) => {
  try {
    const features = new APIFeatures(Job.find({ status: "active" }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const jobs = await features.query;

    // Count total documents for pagination
    const total = await Job.countDocuments(features.filterQuery);

    res.status(200).json({
      status: "success",
      results: jobs.length,
      total,
      data: {
        jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "firstName lastName email avatar company")
      .populate("applicationsCount");

    if (!job) {
      return next(new AppError("No job found with that ID", 404));
    }

    // Increment view count
    job.views += 1;
    await job.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user._id,
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(new AppError("No job found with that ID", 404));
    }

    // Check if user is authorized to update
    if (
      job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError("You are not authorized to update this job", 403)
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        job: updatedJob,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(new AppError("No job found with that ID", 404));
    }

    // Check if user is authorized to delete
    if (
      job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError("You are not authorized to delete this job", 403)
      );
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.applyForJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(new AppError("No job found with that ID", 404));
    }

    // Check if job is still open
    if (!job.isOpen()) {
      return next(
        new AppError("This job is no longer accepting applications", 400)
      );
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: job._id,
      candidate: req.user._id,
    });

    if (existingApplication) {
      return next(new AppError("You have already applied for this job", 400));
    }

    // Create application
    const application = await Application.create({
      job: job._id,
      candidate: req.user._id,
      resume: req.user.resume,
      coverLetter: req.body.coverLetter,
      status: "applied",
      source: "portal",
    });

    // Add status history
    application.addStatusHistory(
      "applied",
      req.user._id,
      "Application submitted"
    );
    await application.save();

    // Send notification
    const io = req.app.get("io");
    io.to(`user_${job.postedBy}`).emit("newApplication", {
      jobId: job._id,
      applicationId: application._id,
      candidateName: req.user.fullName,
    });

    res.status(201).json({
      status: "success",
      data: {
        application,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.searchJobs = async (req, res, next) => {
  try {
    const {
      q,
      location,
      experience,
      type,
      salaryMin,
      salaryMax,
      remote,
      skills,
    } = req.query;

    let query = { status: "active" };

    // Text search
    if (q) {
      query.$text = { $search: q };
    }

    // Location filter
    if (location) {
      query.$or = [
        { workLocation: { $regex: location, $options: "i" } },
        { "workLocation.city": { $regex: location, $options: "i" } },
        { "workLocation.country": { $regex: location, $options: "i" } },
      ];
    }

    // Remote filter
    if (remote === "true") {
      query.location = "remote";
    }

    // Experience level filter
    if (experience) {
      query.experienceLevel = experience;
    }

    // Employment type filter
    if (type) {
      query.employmentType = type;
    }

    // Salary range filter
    if (salaryMin || salaryMax) {
      query["salary.min"] = {};
      if (salaryMin) query["salary.min"].$gte = Number(salaryMin);
      if (salaryMax) query["salary.max"].$lte = Number(salaryMax);
    }

    // Skills filter
    if (skills) {
      const skillsArray = skills.split(",");
      query.skills = {
        $in: skillsArray.map((skill) => new RegExp(skill, "i")),
      };
    }

    const features = new APIFeatures(Job.find(query), req.query)
      .sort()
      .paginate();

    const jobs = await features.query;
    const total = await Job.countDocuments(query);

    res.status(200).json({
      status: "success",
      results: jobs.length,
      total,
      data: {
        jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.featureJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { featured: req.body.featured },
      { new: true, runValidators: true }
    );

    if (!job) {
      return next(new AppError("No job found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getJobStats = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      {
        $facet: {
          totalJobs: [{ $count: "count" }],
          jobsByStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
          jobsByCategory: [
            { $group: { _id: "$category", count: { $sum: 1 } } },
          ],
          jobsByMonth: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
            { $limit: 12 },
          ],
          avgSalary: [
            {
              $group: {
                _id: null,
                avgMin: { $avg: "$salary.min" },
                avgMax: { $avg: "$salary.max" },
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats: stats[0],
      },
    });
  } catch (error) {
    next(error);
  }
};
