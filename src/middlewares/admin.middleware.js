const role = require('../utils/role');
const userService = require('../services/user.service');
const adminService = require('../services/admin.service');

module.exports = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (user && user.role === role.ADMIN) {
      const admin = await adminService.findAdmin({ userId: user.id });
      req.admin = admin;
      next();
    } else throw new Error('Forbidden');
  } catch (e) {
    res.status(403).send({ message: e.message });
  }
};
