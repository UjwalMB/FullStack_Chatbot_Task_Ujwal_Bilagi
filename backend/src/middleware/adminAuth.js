require("dotenv").config();

const adminAuth = (req, res, next) => {
  const apiKey = req.headers["x-admin-key"];

  if (!apiKey) {
    return res.status(401).json({
      message: "Admin authentication required",
    });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({
      message: "Unauthorized request",
    });
  }

  next();
};

module.exports = adminAuth;