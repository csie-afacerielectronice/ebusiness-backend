import { plainToClass, classToPlain } from "class-transformer";
import { User } from "../models/user";

export interface UserDTO {
  id: string;
  email: string;
  password?: string;
  role: string;
}

export class UserDtoImpl {
  static fromRequest(data: Record<string, unknown>): User {
    return plainToClass(User, data);
  }

  static toJSON(model: User): UserDTO {
    return classToPlain(model) as UserDTO;
  }
}
