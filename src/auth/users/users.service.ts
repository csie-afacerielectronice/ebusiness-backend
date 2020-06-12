import { Injectable } from "@nestjs/common";

import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(query: Record<string, unknown>) {
    return await this.userRepository.findOne({ ...query });
  }
}
