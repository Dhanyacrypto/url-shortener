const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");
const Analytics = require("../models/Analytics");
const validateUrl = require("../utils/validateUrl");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    if (!validateUrl(originalUrl)) {
      return res.status(400).json({
        message: "Invalid URL",
      });
    }

    let shortCode;

    if (customAlias && customAlias.trim() !== "") {

      const existingUrl =
        await Url.findOne({
          shortCode: customAlias,
        });

      if (existingUrl) {
        return res.status(400).json({
          message:
            "Alias already exists",
        });
      }

      shortCode = customAlias;

    } else {

      shortCode = generateCode();

    }

    const url = await Url.create({
      userId: req.user.id,
      originalUrl,
      shortCode,
    });

    res.status(201).json({
      message: "Short URL created",
      shortUrl: `http://localhost:5000/${shortCode}`,
      data: url,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    // Increase click count
    url.clickCount += 1;

    await url.save();

    await Analytics.create({
  urlId: url._id,
});

    // Redirect
    res.redirect(url.originalUrl);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(urls);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await Url.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    await Url.findByIdAndDelete(id);

    res.status(200).json({
      message: "URL deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getMyUrls,
  deleteUrl,
};