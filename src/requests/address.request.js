const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  id: Joi.string(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  // isPrimary: yup.boolean().required(),
  county: Joi.string().required(),
  postalCode: Joi.alphanum().required()
  // lat: yup.number().required(),
  // lng: yup.number().required()
});
