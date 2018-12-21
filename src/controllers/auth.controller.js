const yup = require('yup');
const userService = require('../services/user.service');
const errorHandler = require('../utils/errorHandler');

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required()
});

module.exports = {
  registerUser: async (req, res) => {
    try {
      await registerSchema.validate(req.body);
      const user = await userService.createUser(req.body);
      res.status(201).send(user.authJSON());
    } catch (e) {
      errorHandler(res, e);
    }
  },
  loginUser: async (req, res) => {
    res.status(200).send(req.user.authJSON());
  }
};
