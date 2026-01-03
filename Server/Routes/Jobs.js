const express = require("express");
const router = express.Router();
const { authenticate, restrictTo } = require("../middleware/auth");
const jobController = require("../Controller/jobController");
const applicationController = require("../Controller/applicationController");

// Public routes
router.get("/", jobController.getAllJobs);
router.get("/search", jobController.searchJobs);
router.get("/:id", jobController.getJob);

// Protected routes
router.use(authenticate);

router.post("/", restrictTo("recruiter", "admin"), jobController.createJob);

router.patch("/:id", restrictTo("recruiter", "admin"), jobController.updateJob);

router.delete(
  "/:id",
  restrictTo("recruiter", "admin"),
  jobController.deleteJob
);

router.get(
  "/:id/applications",
  restrictTo("recruiter", "admin"),
  applicationController.getJobApplications
);

router.post("/:id/apply", restrictTo("candidate"), jobController.applyForJob);

// Admin only routes
router.patch("/:id/feature", restrictTo("admin"), jobController.featureJob);

router.get("/admin/stats", restrictTo("admin"), jobController.getJobStats);

module.exports = router;
