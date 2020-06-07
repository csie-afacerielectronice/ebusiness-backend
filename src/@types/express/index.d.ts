import { UserDTO } from "../../app/domains/auth/models/user";

declare module "express-serve-static-core" {
  export interface Request {
    user: UserDTO;
  }
}
