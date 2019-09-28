const addressService = require('../services/address_service');
const role = require('../utils/role');
const { FORBIDDEN } = require('../utils/errors');

module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== role.ADMIN) next();
    const findParams = {
      userId: req.user.id
    };
    if (req.params.id) {
      findParams.id = req.params.id;
    }
    const address = await addressService.find(findParams);
    if (!address) {
      FORBIDDEN();
    }
  } catch (e) {
    next(e);
  }
};
