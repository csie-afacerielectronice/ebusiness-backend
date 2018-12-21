const { ValidationError } = require('yup');

module.exports = (res, e) => {
  let status = 500;
  if (e instanceof ValidationError) status = 422;
  res.status(status).send({ message: e.message });
};
