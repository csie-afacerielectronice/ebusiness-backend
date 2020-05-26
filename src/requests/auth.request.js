const Joi = require("@hapi/joi");

module.exports = {
  user: Joi.object().keys({
    id: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    telephone: Joi.string().required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
