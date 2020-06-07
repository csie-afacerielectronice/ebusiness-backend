import { Request, Response } from "express";
import { APIError } from "utils/errors";

export class ErrorMiddleware {
  static execute(error: APIError, _: Request, response: Response): void {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    // if (process.env.NODE_ENV === 'DEV') console.error(error);
    response.status(status).send({ message });
  }
}
