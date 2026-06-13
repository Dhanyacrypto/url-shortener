const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);
module.exports = router;