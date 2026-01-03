export const ROLES = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
};

export const JOB_TYPES = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
  { value: "freelance", label: "Freelance" },
];

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "junior", label: "Junior (1-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior (5+ years)" },
  { value: "lead", label: "Lead/Manager" },
  { value: "executive", label: "Executive" },
];

export const SALARY_RANGES = [
  { value: "0-30000", label: "Under $30,000" },
  { value: "30000-50000", label: "$30,000 - $50,000" },
  { value: "50000-80000", label: "$50,000 - $80,000" },
  { value: "80000-120000", label: "$80,000 - $120,000" },
  { value: "120000-200000", label: "$120,000 - $200,000" },
  { value: "200000+", label: "Over $200,000" },
];

export const APPLICATION_STATUS = {
  APPLIED: "applied",
  UNDER_REVIEW: "under_review",
  SHORTLISTED: "shortlisted",
  INTERVIEW: "interview",
  REJECTED: "rejected",
  OFFERED: "offered",
  HIRED: "hired",
};

export const APPLICATION_STATUS_COLORS = {
  applied: "blue",
  under_review: "yellow",
  shortlisted: "purple",
  interview: "indigo",
  rejected: "red",
  offered: "green",
  hired: "emerald",
};

export const APPLICATION_STATUS_LABELS = {
  applied: "Applied",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview",
  rejected: "Rejected",
  offered: "Offered",
  hired: "Hired",
};

export const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "SG", label: "Singapore" },
  { value: "JP", label: "Japan" },
  { value: "BR", label: "Brazil" },
];

export const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "hospitality", label: "Hospitality" },
  { value: "marketing", label: "Marketing" },
  { value: "consulting", label: "Consulting" },
  { value: "non-profit", label: "Non-Profit" },
];

export const SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "TypeScript",
  "AWS",
  "Docker",
  "Kubernetes",
  "SQL",
  "MongoDB",
  "GraphQL",
  "REST API",
  "Git",
  "CI/CD",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Project Management",
  "Agile Methodology",
  "DevOps",
  "Cybersecurity",
  "Mobile Development",
  "Cloud Computing",
];
