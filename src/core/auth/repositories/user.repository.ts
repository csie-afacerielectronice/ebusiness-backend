import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: string): Promise<User> {
    return this.findById(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async persist(data: Record<string, unknown>): Promise<User> {
    const user = this.create({ ...data });
    return await this.save(user);
  }

  async put(data: Record<string, unknown>): Promise<User> {
    const { id, ...attributes } = data;
    const user = await this.findOneOrFail(id);
    Object.keys(attributes).forEach((key: string) => {
      user[key] = data[key];
    });
    return await this.save(user);
  }
}
