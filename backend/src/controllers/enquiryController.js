const pool = require("../db/connection");

// GET all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM enquiries ORDER BY created_at DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error("Get enquiries error:", error.message);

    res.status(500).json({
      message: "Failed to fetch enquiries",
    });
  }
};

// GET one enquiry
const getEnquiryById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM enquiries WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get enquiry error:", error.message);

    res.status(500).json({
      message: "Failed to fetch enquiry",
    });
  }
};

// CREATE enquiry
const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      userType,
      interest,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !userType ||
      !interest ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit phone number",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO enquiries
      (name, email, phone, user_type, interest, message)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name.trim(), email.trim(), phone.trim(), userType, interest, message.trim()]
    );

    res.status(201).json({
      message: "Enquiry submitted successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Create enquiry error:", error.message);

    res.status(500).json({
      message: "Failed to create enquiry",
    });
  }
};

// UPDATE enquiry status/details
const updateEnquiry = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "In Progress",
      "Closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const [result] = await pool.query(
      "UPDATE enquiries SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.json({
      message: "Enquiry status updated successfully",
    });
  } catch (error) {
    console.error("Update enquiry error:", error.message);

    res.status(500).json({
      message: "Failed to update enquiry",
    });
  }
};

// DELETE enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM enquiries WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.json({
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error.message);

    res.status(500).json({
      message: "Failed to delete enquiry",
    });
  }
};

module.exports = {
  getAllEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
};