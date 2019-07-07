const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().required()
});
