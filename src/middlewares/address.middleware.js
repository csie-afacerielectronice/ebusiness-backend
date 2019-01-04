const addressService = require('../services/address.service');
const role = require('../utils/role');

module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== role.ADMIN) next();
    const findParams = {
      clientId: req.client.id
    };
    if (req.params.id) findParams.id = req.params.id;
    await addressService.findAddress(findParams);
  } catch (e) {
    next(e);
  }
};
