import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  BaseHttpController,
} from "inversify-express-utils";

import { TYPES } from "../types";

import passport from "../../../config/passport";

import { CreateTokensAction } from "../../domains/auth/actions/createTokens.action";
import { CreateUserAction } from "../../domains/auth/actions/createUser.action";

import { AuthRequest } from "../requests/auth.request";

@controller("")
export class AuthController extends BaseHttpController {
  constructor(
    @inject(TYPES.requests.AuthRequest) private authRequest: AuthRequest
  ) {
    super();
  }

  @httpPost("/login", passport.authenticate("local"))
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = await CreateTokensAction.execute(req.user.id);
      res.status(200).send({ accessToken });
    } catch (e) {
      next(e);
    }
  }

  @httpPost("/register")
  public async register(
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
