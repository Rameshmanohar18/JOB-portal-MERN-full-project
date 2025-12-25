const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/dbConnect");
const path = require("path");

// Load environment variables
// dotenv.config();
dotenv.config({ silent: true });

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MERN Backend API" });
});

// Define routes
app.use("/api/users", require("./Routes/UserRoutes"));

// Error handling middleware
app.use(require("./Middleware/errorMiddleware"));

// Server configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
