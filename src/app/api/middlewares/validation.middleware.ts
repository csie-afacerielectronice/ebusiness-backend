import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { AnySchema } from "@hapi/joi";
import { APIError } from "./../../../utils/errors";

@injectable()
export class ValidationMiddleware extends BaseMiddleware {
  private schema: AnySchema;
  constructor(schema: AnySchema) {
    super();
    this.schema = schema;
  }
  public handler(req: Request, _: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body);
    if (error) {
      next(APIError.UNPROCESSABLE_ENTITY(error.message));
    } else {
      next();
    }
  }
}
