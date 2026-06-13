const Url = require("../models/Url");
const Analytics = require("../models/Analytics");

const getAnalytics = async (req, res) => {
  try {
    const { urlId } = req.params;

    const url = await Url.findById(urlId);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    const visits = await Analytics.find({
      urlId,
    })
      .sort({ timestamp: -1 })
      .limit(10);

    const lastVisit =
      visits.length > 0
        ? visits[0].timestamp
        : null;

    res.json({
      totalClicks: url.clickCount,
      lastVisited: lastVisit,
      recentVisits: visits,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};