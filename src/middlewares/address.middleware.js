const addressService = require('../services/address.service');
const role = require('../utils/role');

module.exports = async (req, res, next) => {
  try {
    if (req.user.role === role.ADMIN) {
      return next();
    }
    await addressService.find(req.params.id, {
      userId: req.user.id
    });
    next();
  } catch (e) {
    next(e);
  }
};
