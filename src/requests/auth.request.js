const Joi = require('@hapi/joi');

module.exports = {
  admin: Joi.object().keys({
    user: Joi.object()
      .keys({
        id: Joi.string(),
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string().required()
      })
      .required(),
    admin: Joi.object().keys({
      id: Joi.string(),
      name: Joi.string().required()
    })
  }),
  client: Joi.object().keys({
    user: Joi.object()
      .keys({
        id: Joi.string(),
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string().required()
      })
      .required(),
    client: Joi.object().keys({
      id: Joi.string(),
      name: Joi.string().required(),
      surname: Joi.string().required()
    })
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  })
};
