const { UNAUTHORIZED } = require('../utils/errors');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.refresh_token) {
      UNAUTHORIZED();
    }
    next();
  } catch (e) {
    next(e);
  }
};
