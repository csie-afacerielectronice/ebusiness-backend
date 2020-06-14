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
    return await this.userRepository.persist(data);
  }

  async updateEmail(id: string, email: string) {
    return await this.userRepository.put({ id, email });
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    await this.userRepository.put({ id, password: data.password });
  }
}
