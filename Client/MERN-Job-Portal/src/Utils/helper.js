import { format, formatDistanceToNow, parseISO } from "date-fns";

export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  if (!date) return "";
  return format(new Date(date), formatStr);
};

export const formatRelativeTime = (date) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export const validateFile = (
  file,
  allowedTypes = ["application/pdf"],
  maxSize = 5 * 1024 * 1024
) => {
  if (!file) return { valid: false, error: "No file selected" };

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `File size too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true, error: null };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const getStatusBadgeColor = (status) => {
  const colors = {
    active: "green",
    inactive: "gray",
    pending: "yellow",
    approved: "blue",
    rejected: "red",
    draft: "gray",
    published: "green",
    closed: "red",
  };
  return colors[status] || "gray";
};
