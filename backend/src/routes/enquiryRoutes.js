const express = require("express");

const {
  getAllEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Public route - users can submit enquiries
router.post("/", createEnquiry);

// Admin routes - authentication required
router.get("/", adminAuth, getAllEnquiries);
router.get("/:id", adminAuth, getEnquiryById);
router.put("/:id", adminAuth, updateEnquiry);
router.delete("/:id", adminAuth, deleteEnquiry);

module.exports = router;