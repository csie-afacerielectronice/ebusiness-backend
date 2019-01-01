const role = require('../utils/role');
const clientService = require('../services/client.service');
const userService = require('../services/user.service');
const adminService = require('../services/admin.service');

module.exports = {
  loginUser: async (req, res) => {
    res.status(200).send(req.user.token());
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).send(users);
    } catch (e) {
      next(e);
    }
  },
  registerClient: async (req, res, next) => {
    try {
      const user = await userService.createUser({
        ...req.body.user,
        role: role.CLIENT
      });
      await clientService.createClient({
        ...req.body.client,
        userId: user.id
      });
      res.status(201).send(user.token());
    } catch (e) {
      next(e);
    }
  },
  registerAdmin: async (req, res, next) => {
    try {
      const user = await userService.createUser({
        ...req.body.user,
        role: role.ADMIN
      });
      await adminService.createAdmin({
        ...req.body.admin,
        userId: user.id
      });
      res.status(201).send(user.token());
    } catch (e) {
      next(e);
    }
  },
  patchUser: async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body.user);
      let client = null;
      let admin = null;
      switch (user.role) {
        case role.CLIENT:
          client = await clientService.updateClient(req.body.client);
          break;
        case role.ADMIN:
          admin = await adminService.updateAdmin(req.body.admin);
          break;
      }
      res.status(200).send({ ...user, client, admin });
    } catch (e) {
      next(e);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = await userService.getUser(req.params.id);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
};
