const Joi = require('@hapi/joi');
module.exports = Joi.object().keys({
  id: Joi.string(),
  deliveryAddressId: Joi.string().required(),
  receiptAddressId: Joi.string().required(),
  products: Joi.array().items(
    Joi.object().keys({
      productId: Joi.string().required(),
      quantity: Joi.number().required()
    })
  )
});
