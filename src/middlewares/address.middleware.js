const role = require('../utils/role');
const clientService = require('../services/client.service');
const addressService = require('../services/address.service');

module.exports = async (req, res, next) => {
  try {
    const client = await clientService.findClient({ userId: req.user.id });
    if (client) {
      const address = await addressService.findAddress({ clientId: client.id });
      if (!!address || req.user.role === role.ADMIN) {
        next();
      } else throw new Error('Forbidden');
    } else throw new Error('Forbidden');
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
