import Joi, { ObjectSchema } from "@hapi/joi";

export class AuthRequest {
  static register(): ObjectSchema {
    return Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      // name: Joi.string().required(),
      // surname: Joi.string().required(),
      // telephone: Joi.string().required(),
    });
  }
  static login(): ObjectSchema {
    return Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
  }
}
