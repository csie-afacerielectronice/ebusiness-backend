import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "app/domains/auth/models/user";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  telephone!: string;

  @Column()
  avatar?: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
