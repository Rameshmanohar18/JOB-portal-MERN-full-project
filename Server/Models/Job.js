const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [200, "Job title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      minlength: [50, "Job description must be at least 50 characters"],
    },
    requirements: {
      type: [String],
      required: [true, "Job requirements are required"],
    },
    responsibilities: {
      type: [String],
      required: [true, "Job responsibilities are required"],
    },
    company: {
      name: {
        type: String,
        required: [true, "Company name is required"],
      },
      logo: String,
      website: String,
      about: String,
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      enum: ["remote", "onsite", "hybrid"],
    },
    workLocation: {
      city: String,
      state: String,
      country: String,
      address: String,
    },
    employmentType: {
      type: String,
      required: [true, "Employment type is required"],
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
      enum: ["entry", "mid", "senior", "executive"],
    },
    salary: {
      min: {
        type: Number,
        required: [true, "Minimum salary is required"],
      },
      max: {
        type: Number,
        required: [true, "Maximum salary is required"],
      },
      currency: {
        type: String,
        default: "USD",
      },
      isNegotiable: Boolean,
      period: {
        type: String,
        enum: ["hourly", "monthly", "yearly"],
        default: "yearly",
      },
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    benefits: [String],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "technology",
        "marketing",
        "sales",
        "design",
        "finance",
        "hr",
        "operations",
        "other",
      ],
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    meta: {
      lastReviewed: Date,
      seoDescription: String,
      seoKeywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for search and filtering
jobSchema.index({
  title: "text",
  description: "text",
  "company.name": "text",
  tags: "text",
});
jobSchema.index({ status: 1, applicationDeadline: 1 });
jobSchema.index({ location: 1, employmentType: 1, experienceLevel: 1 });
jobSchema.index({ "salary.min": 1, "salary.max": 1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ featured: 1, createdAt: -1 });

// Virtual for applications
jobSchema.virtual("applications", {
  ref: "Application",
  foreignField: "job",
  localField: "_id",
});

// Middleware to update applications count
jobSchema.pre("save", function (next) {
  if (this.isNew) {
    this.applicationsCount = 0;
  }
  next();
});

// Method to check if job is still open
jobSchema.methods.isOpen = function () {
  return this.status === "active" && this.applicationDeadline > new Date();
};

module.exports = mongoose.model("Job", jobSchema);
