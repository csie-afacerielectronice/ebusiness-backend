const role = require('../utils/role');
const orderService = require('../services/order.service');

module.exports = async (req, res, next) => {
  try {
    if (req.user.role === role.ADMIN) {
      next();
    }
    await orderService.findOrder({
      clientId: req.client.id
    });
    next();
  } catch (e) {
    next(e);
  }
};
