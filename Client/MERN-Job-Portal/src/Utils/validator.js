import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: yup
    .string()
    .oneOf(["candidate", "recruiter"])
    .required("Role is required"),
});

export const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  company: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
  type: yup
    .string()
    .oneOf([
      "full-time",
      "part-time",
      "contract",
      "internship",
      "remote",
      "freelance",
    ])
    .required("Job type is required"),
  experienceLevel: yup
    .string()
    .oneOf(["entry", "junior", "mid", "senior", "lead", "executive"])
    .required("Experience level is required"),
  salary: yup.object().shape({
    min: yup.number().min(0, "Minimum salary must be positive"),
    max: yup
      .number()
      .min(yup.ref("min"), "Maximum salary must be greater than minimum"),
  }),
  description: yup.string().required("Job description is required"),
  requirements: yup.string().required("Requirements are required"),
  skills: yup.array().min(1, "At least one skill is required"),
});

export const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  location: yup.string(),
  bio: yup.string().max(500, "Bio must be less than 500 characters"),
  website: yup.string().url("Invalid URL"),
  linkedin: yup.string().url("Invalid URL"),
  github: yup.string().url("Invalid URL"),
});

export const applicationSchema = yup.object().shape({
  coverLetter: yup.string().required("Cover letter is required"),
  resume: yup.mixed().required("Resume is required"),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from current password"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
