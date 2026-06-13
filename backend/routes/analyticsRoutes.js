const express = require("express");

const {
  getAnalytics,
} = require("../controllers/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/:urlId",
  authMiddleware,
  getAnalytics
);

module.exports = router;