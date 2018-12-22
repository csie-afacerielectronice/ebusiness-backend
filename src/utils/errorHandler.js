const { ValidationError } = require('yup');

module.exports = (e, next) => {
  if (e instanceof ValidationError) e.status = 422;
  return next(e);
};
