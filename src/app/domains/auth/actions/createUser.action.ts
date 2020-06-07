import { getCustomRepository } from "typeorm";
import { UserDTO } from "../models/user";
import { UserDtoImpl } from "../dto/user.dto";
import { UserRepository } from "./../repositories/user.repository";

export class CreateUserAction {
  static async execute(userData: UserDTO): Promise<UserDTO> {
    const object = UserDtoImpl.fromRequest(userData);
    const user = await getCustomRepository(UserRepository).save(object);
    return UserDtoImpl.toJSON(user);
  }
}
