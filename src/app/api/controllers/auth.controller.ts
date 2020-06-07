import { NextFunction, Request, Response, Application } from "express";

import passport from "../../../config/passport";

import { CreateTokensAction } from "../../domains/auth/actions/createTokens.action";
import { CreateUserAction } from "../../domains/auth/actions/createUser.action";

import { AuthRequest } from "../requests/auth.request";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

export class AuthController {
  public register(app: Application): void {
    app.post(
      "/login",
      ValidationMiddleware.execute(AuthRequest.login()),
      passport.authenticate("local"),
      this.login
    );
    app.post(
      "/register",
      ValidationMiddleware.execute(AuthRequest.register()),
      this.registerUser
    );
  }
  private async login(req: Request, res: Response): Promise<void> {
    const accessToken = await CreateTokensAction.execute(req.user.id);
    res.status(200).send({ accessToken });
  }
  private async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await CreateUserAction.execute(req.body);
      const accessToken = await CreateTokensAction.execute(user.id);
      res.status(201).send({ accessToken });
    } catch (e) {
      next(e);
    }
  }

  // async updateUser() {}
}
