const role = require('../utils/role');
const addressService = require('../services/address.service');
const { FORBIDDEN } = require('../utils/errors');

module.exports = async (req, res, next) => {
  try {
    const address = await addressService.findAddress({
      clientId: req.client.id
    });
    if (!!address || req.user.role === role.ADMIN) {
      next();
    } else FORBIDDEN();
  } catch (e) {
    next(e);
  }
};
