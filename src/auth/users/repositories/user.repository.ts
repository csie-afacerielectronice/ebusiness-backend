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
}
