import { UserDTO, User } from "../models/user";

export class UserDtoImpl {
  static fromRequest(data: UserDTO): User {
    return new User(
      data.email,
      data.password as string,
      data.role ? data.role : "client"
    );
  }

  static toJSON(model: User): UserDTO {
    return {
      id: model.id,
      email: model.email,
      role: model.role,
    };
  }
}
