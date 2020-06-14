import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./repositories/profile.repository";

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async create(data: Record<string, unknown>) {
    return await this.profileRepository.persist(data);
  }

  async update(data: Record<string, unknown>) {
    return await this.profileRepository.put(data);
  }

  async findByUserId(userId: string) {
    return await this.profileRepository.findOneOrFail({ userId });
  }

  async updateByUserId(userId: string, data: Record<string, unknown>) {
    const profile = await this.profileRepository.findOneOrFail({ userId });
    Object.keys(data).forEach((key: string) => {
      profile[key] = data[key];
    });
    return await this.profileRepository.save(profile);
  }
}
