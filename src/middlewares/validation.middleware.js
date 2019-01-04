const { UNPROCESSABLE_ENTITY } = require('../utils/errors');

module.exports = schema => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    next(UNPROCESSABLE_ENTITY(e));
  }
};
