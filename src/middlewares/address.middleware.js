const addressService = require('../services/address.service');
const { FORBIDDEN } = require('../utils/errors');
const role = require('../utils/role');

module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== role.ADMIN) return next();
    const findParams = {
      userId: req.user.id
    };
    if (req.params.id) findParams.id = req.params.id;
    await addressService.findAddress(findParams);
    if (req.params.userId !== req.user.id) FORBIDDEN();
  } catch (e) {
    return next(e);
  }
};
