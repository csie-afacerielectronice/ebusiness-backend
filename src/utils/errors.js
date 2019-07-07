class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
  }
}

module.exports = {
  NOT_FOUND: () => {
    throw new APIError('Not Found', 404);
  },
  UNPROCESSABLE_ENTITY: message => {
    throw new APIError(message, 422);
  },
  FORBIDDEN: () => {
    throw new APIError('Forbidden', 403);
  },
  UNAUTHORIZED: () => {
    throw new APIError('Unauthorized', 401);
  }
};
