const { FORBIDDEN } = require("../utils/errors");

module.exports = (roles) => async (req, res, next) => {
  try {
    if (roles.some((item) => item === req.user.role)) {
      next();
    } else {
      next(FORBIDDEN());
    }
  } catch (e) {
    next(e);
  }
};
