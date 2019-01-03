module.exports = {
  NOT_FOUND: () => {
    let err = new Error('Not Found');
    err.status = 404;
    return err;
  },
  UNPROCESSABLE_ENTITY: e => {
    let err = new Error(e.message);
    err.status = 422;
    return err;
  },
  FORBIDDEN: () => {
    let err = new Error('Forbidden');
    err.status = 403;
    return err;
  }
};
