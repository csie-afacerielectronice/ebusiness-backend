import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./repositories/profile.repository";

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async create(data: Record<string, unknown>) {
    const profile = this.profileRepository.create({ ...data });
    return await this.profileRepository.save(profile);
  }
}
