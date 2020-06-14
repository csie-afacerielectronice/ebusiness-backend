import { Injectable } from "@nestjs/common";

import { UserRepository } from "./repositories/user.repository";

import { UpdatePasswordDto } from "./dtos/updatePassword.dto";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: string) {
    return await this.userRepository.findOneOrFail(id);
  }

  async findOne(query: Record<string, unknown>) {
    return await this.userRepository.findOne({ ...query });
  }

  async create(data: Record<string, unknown>) {
    const user = this.userRepository.create({ ...data });
    return await this.userRepository.save(user);
  }

  async updateEmail(id: string, email: string) {
    const user = await this.userRepository.findOneOrFail(id);
    user.email = email;
    return await this.userRepository.save(user);
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const user = await this.userRepository.findOneOrFail(id);
    user.password = data.password;
    await this.userRepository.save(user);
  }
}
