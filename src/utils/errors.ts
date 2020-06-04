export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status || 500;
  }
  static NOT_FOUND(): void {
    throw new APIError("Not Found", 404);
  }

  static UNPROCESSABLE_ENTITY(message: string): void {
    throw new APIError(message, 422);
  }

  static FORBIDDEN(): void {
    throw new APIError("Forbidden", 403);
  }

  static UNAUTHORIZED(): void {
    throw new APIError("Unauthorized", 401);
  }
}
