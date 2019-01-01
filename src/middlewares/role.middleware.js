const role = require('../utils/role');
const clientService = require('../services/client.service');
const adminService = require('../services/admin.service');
const { FORBIDDEN } = require('../utils/errors');

module.exports = roles => async (req, res, next) => {
  try {
    if (
      roles.some(role => role === req.user.role) ||
      req.user.role === role.ADMIN
    ) {
      switch (req.user.role) {
        case role.ADMIN:
          req.admin = await adminService.findAdmin({ userId: req.user.id });
          break;
        case role.CLIENT:
          req.client = await clientService.findClient({ userId: req.user.id });
          break;
      }
      return next();
    } else FORBIDDEN();
  } catch (e) {
    return next(e);
  }
};
