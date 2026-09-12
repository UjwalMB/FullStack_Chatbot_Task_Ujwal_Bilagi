const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const pool = require("./db/connection");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Security headers
app.use(helmet());

// Allow requests from frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);

// Limit repeated requests
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// Parse JSON
app.use(express.json({ limit: "10kb" }));

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "DroneTV Backend API is running 🚁",
  });
});

// Database test
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");

    res.json({
      message: "MySQL connection successful",
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Enquiry routes
app.use("/api/enquiries", enquiryRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "The requested resource was not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error.message);

  res.status(500).json({
    message: "Something went wrong. Please try again later.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});