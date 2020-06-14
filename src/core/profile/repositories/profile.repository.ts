import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../entities/profile.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async persist(data: Record<string, unknown>): Promise<Profile> {
    const profile = this.create({ ...data });
    return await this.save(profile);
  }

  async put(data: Record<string, unknown>): Promise<Profile> {
    const { id, ...attributes } = data;
    const profile = await this.findOneOrFail(id);
    Object.keys(attributes).forEach((key: string) => {
      profile[key] = data[key];
    });
    return await this.save(profile);
  }
}
