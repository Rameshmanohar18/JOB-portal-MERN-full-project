const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job is required"],
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Candidate is required"],
    },
    resume: {
      url: {
        type: String,
        required: [true, "Resume URL is required"],
      },
      publicId: String,
      fileName: String,
    },
    coverLetter: {
      type: String,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: [
        "applied",
        "under_review",
        "shortlisted",
        "interviewing",
        "rejected",
        "withdrawn",
        "selected",
      ],
      default: "applied",
    },
    currentStage: {
      type: String,
      enum: ["application", "screening", "interview", "offer", "hired"],
      default: "application",
    },
    interview: {
      scheduledAt: Date,
      type: {
        type: String,
        enum: ["phone", "video", "in_person"],
      },
      link: String,
      location: String,
      notes: String,
      feedback: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    feedback: {
      general: String,
      strengths: [String],
      weaknesses: [String],
      internalNotes: String,
    },
    source: {
      type: String,
      enum: ["portal", "linkedin", "indeed", "referral", "other"],
      default: "portal",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    statusHistory: [
      {
        status: String,
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
        notes: String,
      },
    ],
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    rating: {
      candidate: {
        type: Number,
        min: 1,
        max: 5,
      },
      recruiter: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    meta: {
      lastViewed: Date,
      viewCount: Number,
      emailNotifications: {
        candidate: Boolean,
        recruiter: Boolean,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
applicationSchema.index({ candidate: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ "interview.scheduledAt": 1 });
applicationSchema.index({ appliedAt: -1 });

// Middleware to update job applications count
applicationSchema.post("save", async function () {
  const Job = mongoose.model("Job");
  await Job.findByIdAndUpdate(this.job, {
    $inc: { applicationsCount: 1 },
  });
});

// Method to add status history entry
applicationSchema.methods.addStatusHistory = function (
  status,
  changedBy,
  notes = ""
) {
  this.statusHistory.push({
    status,
    changedBy,
    notes,
    changedAt: new Date(),
  });
};

// Virtual for populated job details
applicationSchema.virtual("jobDetails", {
  ref: "Job",
  localField: "job",
  foreignField: "_id",
  justOne: true,
});

// Virtual for populated candidate details
applicationSchema.virtual("candidateDetails", {
  ref: "User",
  localField: "candidate",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Application", applicationSchema);
