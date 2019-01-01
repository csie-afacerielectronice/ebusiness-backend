module.exports = {
  NOT_FOUND: () => {
    let err = new Error('Not Found');
    err.status = 404;
    throw err;
  },
  UNPROCESSABLE_ENTITY: e => {
    let err = new Error(e.message);
    err.status = 422;
    throw err;
  },
  FORBIDDEN: () => {
    let err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
};
