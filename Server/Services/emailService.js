const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const AppError = require("../utils/appError");
const logger = require("../utils/logger");

// Create transporter based on environment
let transporter;

if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );
} else {
  // For development, use ethereal.email
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  });
}

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV === "development") {
      logger.info("Email sent:", nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    logger.error("Email sending failed:", error);
    throw new AppError(
      "There was an error sending the email. Try again later.",
      500
    );
  }
};

const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Job Portal!</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.firstName},</h2>
          <p>Thank you for registering with Job Portal. Your account has been successfully created.</p>
          <p>You can now:</p>
          <ul>
            <li>Browse thousands of job opportunities</li>
            <li>Upload your resume and apply with one click</li>
            <li>Track your application status</li>
            <li>Set up job alerts</li>
          </ul>
          <p style="text-align: center;">
            <a href="${
              process.env.FRONTEND_URL
            }/dashboard" class="button">Go to Dashboard</a>
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Job Portal. All rights reserved.</p>
          <p>If you didn't create this account, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email: user.email,
    subject: "Welcome to Job Portal!",
    html,
  });
};

const sendApplicationStatusUpdate = async (application, user, job) => {
  const statusMessages = {
    applied: "has been submitted successfully",
    under_review: "is under review",
    shortlisted: "has been shortlisted",
    interviewing: "has been selected for interview",
    rejected: "has been rejected",
    selected: "has been selected! Congratulations!",
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .status-badge { display: inline-block; padding: 5px 10px; border-radius: 20px; font-weight: bold; }
        .status-applied { background: #3B82F6; color: white; }
        .status-review { background: #F59E0B; color: white; }
        .status-shortlisted { background: #10B981; color: white; }
        .status-rejected { background: #EF4444; color: white; }
        .status-selected { background: #8B5CF6; color: white; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Status Update</h1>
        </div>
        <div class="content">
          <h2>Hello ${user.firstName},</h2>
          <p>Your application for <strong>${job.title}</strong> at <strong>${
    job.company.name
  }</strong> ${statusMessages[application.status]}.</p>
          
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Application Details:</h3>
            <p><strong>Position:</strong> ${job.title}</p>
            <p><strong>Company:</strong> ${job.company.name}</p>
            <p><strong>Status:</strong> 
              <span class="status-badge status-${application.status}">
                ${application.status.replace("_", " ").toUpperCase()}
              </span>
            </p>
            <p><strong>Applied Date:</strong> ${new Date(
              application.appliedAt
            ).toLocaleDateString()}</p>
          </div>
          
          <p style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/dashboard/applications/${
    application._id
  }" class="button">
              View Application Details
            </a>
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email: user.email,
    subject: `Application Update: ${job.title}`,
    html,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendApplicationStatusUpdate,
};
