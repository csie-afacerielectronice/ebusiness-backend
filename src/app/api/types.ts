const TYPES = {
  controllers: {
    AuthController: Symbol.for("AuthController"),
  },
  middleware: {
    ValidationMiddleware: Symbol.for("ValidationMiddleware"),
  },
  requests: {
    AuthRequest: Symbol.for("AuthRequest"),
  },
};

export { TYPES };
