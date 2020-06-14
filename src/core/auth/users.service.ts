import { Injectable } from "@nestjs/common";

import { UserRepository } from "./repositories/user.repository";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findOne(query: Record<string, unknown>) {
    return await this.userRepository.findOne({ ...query });
  }

  async create(data: Record<string, unknown>) {
    const user = this.userRepository.create({ ...data });
    return await this.userRepository.save(user);
  }
}
