import { Request, Response, NextFunction } from "express";
import { AnySchema } from "@hapi/joi";
import { APIError } from "./../../../utils/errors";

export class ValidationMiddleware {
  static execute(schema: AnySchema) {
    return (req: Request, _: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(APIError.UNPROCESSABLE_ENTITY(error.message));
      } else {
        next();
      }
    };
  }
}
