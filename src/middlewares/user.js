const { FORBIDDEN } = require('../utils/errors');
const role = require('../utils/role');

module.exports = async (req, res, next) => {
  try {
    if (req.params.id !== req.user.id || req.user.role !== role.ADMIN)
      return next(FORBIDDEN());
  } catch (e) {
    return next(e);
  }
};
