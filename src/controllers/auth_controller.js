const role = require('../utils/role');
const authService = require('../services/auth_routes');
const userService = require('../services/user_routes');

module.exports = {
  loginUser: async (req, res) => {
    const { accessToken, refreshToken } = await authService.createAccessTokens(
      req.user.id
    );

    res.cookie('refresh_token', refreshToken, {
      maxAge: 10080,
      httpOnly: true
    });
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
        role: role.CLIENT
      });
      const {
        accessToken,
        refreshToken
      } = await authService.createAccessTokens(user.id);

      res.cookie('refresh_token', refreshToken, {
        maxAge: 10080,
        httpOnly: true
      });

      res.status(201).send({ accessToken });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  logout: async (req, res, next) => {
    await authService.deleteRefreshToken(req.cookies.refresh_token);
    res.clearCookie('refresh_token');
    res.sendStatus(204);
  },
  refresh: async (req, res, next) => {
    await authService.createAccessTokens(req.user.id);
    res.cookie('refresh_token', refreshToken, {
      maxAge: 10080,
      httpOnly: true
    });
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
      if (req.params.id) id = req.params.id;
      const user = await userService.getUser(id);
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
};
