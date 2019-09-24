const orderService = require('../services/order');
const role = require('../utils/role');

module.exports = async (req, res, next) => {
  try {
    if (req.user.role === role.ADMIN) return next();
    const findObject = {
      clientId: req.client.id
    };
    if (req.params.id) findObject.id = req.params.id;
    await orderService.findOrder(findObject);
    next();
  } catch (e) {
    next(e);
  }
};
