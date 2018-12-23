const role = require('../utils/role');
const orderService = require('../services/order.service');

module.exports = async (req, res, next) => {
  try {
    let err;
    const order = await orderService.findOrder({
      clientId: req.client.id
    });
    if (!!order || req.user.role === role.ADMIN) {
      next();
    } else {
      err = new Error('Not Found');
      err.status = 404;
      throw err;
    }
  } catch (e) {
    next(e);
  }
};
