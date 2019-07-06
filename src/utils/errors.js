class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.message = message;
  }
}

module.exports = {
  NOT_FOUND: () => {
    return new APIError('Not Found', 404);
  },
  UNPROCESSABLE_ENTITY: message => {
    return new APIError(message, 422);
  },
  FORBIDDEN: () => {
    return new APIError('Forbidden', 403);
  },
  UNAUTHORIZED: () => {
    return new APIError('Unauthorized', 401);
  }
};
