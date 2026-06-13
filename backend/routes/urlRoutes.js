const express = require("express");

const {
  createShortUrl,
  redirectUrl,
  getMyUrls,
  deleteUrl,
} = require("../controllers/urlController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createShortUrl
);

router.get(
  "/myurls",
  authMiddleware,
  getMyUrls
);

router.delete(
  "/:id",
  authMiddleware,
  deleteUrl
);

router.get(
  "/:shortCode",
  redirectUrl
);



module.exports = router;