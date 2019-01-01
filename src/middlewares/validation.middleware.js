const { UNPROCESSABLE_ENTITY } = require('../utils/errors');

module.exports = schema => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (e) {
    return next(UNPROCESSABLE_ENTITY(e));
  }
};
