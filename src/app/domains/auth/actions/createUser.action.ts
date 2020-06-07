import { getCustomRepository } from "typeorm";
import { UserDtoImpl, UserDTO } from "../dto/user.dto";
import { UserRepository } from "./../repositories/user.repository";

export class CreateUserAction {
  static async execute(userData: Record<string, unknown>): Promise<UserDTO> {
    const object = UserDtoImpl.fromRequest(userData);
    const user = await getCustomRepository(UserRepository).save(object);
    return UserDtoImpl.toJSON(user);
  }
}
