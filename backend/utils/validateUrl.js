const validator = require("validator");

const validateUrl = (url) => {
  return validator.isURL(url, {
    protocols: ["http", "https"],
    require_protocol: true,
  });
};

module.exports = validateUrl;