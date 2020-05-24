const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  id: Joi.string(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  isPrimary: Joi.boolean(),
  county: Joi.string().required(),
  postalCode: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required()
});
