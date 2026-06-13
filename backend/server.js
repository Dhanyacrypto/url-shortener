const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const { redirectUrl } = require("./controllers/urlController");
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/:shortCode", redirectUrl);
// Test Route
app.get("/", (req, res) => {
  res.send("URL Shortener API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});