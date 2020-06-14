import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  BeforeInsert,
} from "typeorm";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";

import { Address } from "../../addresses/entities/address.entity";
import { Profile } from "../../profile/entities/profile.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "client" })
  role: string;

  @OneToMany(
    () => Address,
    address => address.user,
  )
  addresses: Address[];

  @OneToOne(() => Profile)
  profile: Profile;

  @BeforeInsert()
  async setPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
