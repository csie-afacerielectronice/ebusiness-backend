import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  BeforeInsert,
} from "typeorm";
import * as bcrypt from "bcryptjs";

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

  @Column()
  role: string;

  @OneToMany(
    () => Address,
    address => address.user,
  )
  addresses!: Address[];

  @OneToOne(() => Profile)
  profile: Profile;

  @BeforeInsert()
  setPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
