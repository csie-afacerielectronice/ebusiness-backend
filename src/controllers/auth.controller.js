const role = require("../utils/role");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

module.exports = {
  loginUser: async (req, res) => {
    const { accessToken } = await authService.createAccessTokens(req.user.id);
    res.status(200).send({ accessToken });
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).send(users);
    } catch (e) {
      next(e);
    }
  },
  register: async (req, res, next) => {
    try {
      const user = await userService.createUser({
        ...req.body,
        role: role.CLIENT,
      });
      const { accessToken } = await authService.createAccessTokens(user.id);

      res.status(201).send({ accessToken });
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res) => {
    const { accessToken } = await authService.createAccessTokens(req.user.id);

    res.status(200).send({ accessToken });
  },
  putUser: async (req, res, next) => {
    try {
      let id = req.user.id;
      if (req.params.id) id = req.params.id;
      const user = await userService.updateUser(id, req.body.user);

      res.status(200).send({ user });
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
      let id = req.user.id;
      if (req.params.id) {
        id = req.params.id;
      }
      const user = await userService.getUser(id);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  },
};
