import { AsyncContainerModule } from "inversify";

import ormConnection from "../db";

import { TYPES as APITypes } from "../app/api/types";
import { TYPES as UserTypes } from "../app/domains/auth/types";

import { CreateTokensAction } from "../app/domains/auth/actions/createTokens.action";
import { CreateUserAction } from "../app/domains/auth/actions/createUser.action";

import { AuthRequest } from "../app/api/requests/auth.request";

import "../app/api/controllers/auth.controller";

export const bindings = new AsyncContainerModule(async (bind) => {
  await ormConnection();

  bind<CreateTokensAction>(UserTypes.CreateTokensAction).to(CreateTokensAction);
  bind<CreateUserAction>(UserTypes.CreateUserAction).to(CreateUserAction);

  bind<AuthRequest>(APITypes.requests.AuthRequest).to(AuthRequest);
});
