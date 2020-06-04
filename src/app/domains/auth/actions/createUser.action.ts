import { UserDTO } from "./../models/user.schema";
import { UserDtoImpl } from "../dto/user.dto";

export class CreateUserAction {
  static async execute(userData: UserDTO): Promise<UserDTO> {
    const userObj = UserDtoImpl.fromRequest(userData);
    return UserDtoImpl.toJSON(userObj);
  }
}
