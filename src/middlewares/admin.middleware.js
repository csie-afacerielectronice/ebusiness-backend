const role = require('../utils/role');
const userService = require('../services/user.service');
const adminService = require('../services/admin.service');
const { FORBIDDEN } = require('../utils/errors');

module.exports = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (user && user.role === role.ADMIN) {
      const admin = await adminService.findAdmin({ userId: user.id });
      req.admin = admin;
      next();
    } else FORBIDDEN();
  } catch (e) {
    next(e);
  }
};
