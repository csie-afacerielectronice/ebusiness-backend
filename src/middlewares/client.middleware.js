const role = require('../utils/role');
const userService = require('../services/user.service');
const clientService = require('../services/client.service');
const { FORBIDDEN } = require('../utils/errors');

module.exports = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (user && (user.role === role.CLIENT || user.role === role.ADMIN)) {
      const client = await clientService.findClient({ userId: user.id });
      req.client = client;
      next();
    } else FORBIDDEN();
  } catch (e) {
    next(e);
  }
};
