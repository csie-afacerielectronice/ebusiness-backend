const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  id: Joi.string(),
  score: Joi.number().required(),
  content: Joi.string(),
});
