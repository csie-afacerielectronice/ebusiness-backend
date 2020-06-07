import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "../../auth/models/user";

export interface ProfileDTO {
  id: string;
  name: string;
  surname: string;
  telephone: string;
  avatar?: string;
  user: User;
}

@Entity()
export class Profile implements ProfileDTO {
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
