import { UserDTO } from "./../models/user.schema";
import { User } from "./../models/user";

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
      id: model.getId,
      email: model.getEmail,
      role: model.getRole,
    };
  }
}
