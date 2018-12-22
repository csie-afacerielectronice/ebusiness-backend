const role = require('../utils/role');
const userService = require('../services/user.service');
const clientService = require('../services/client.service');

module.exports = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (user && user.role === role.CLIENT) {
      const client = await clientService.findClient({ userId: user.id });
      req.client = client;
      next();
    } else throw new Error('Forbidden');
  } catch (e) {
    res.status(403).send({ message: e.message });
  }
};
