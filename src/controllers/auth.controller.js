const userService = require('../services/user.service');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).send(user.authJSON());
    } catch (e) {
      next(e);
    }
  },
  loginUser: async (req, res) => {
    res.status(200).send(req.user.authJSON());
  }
};
