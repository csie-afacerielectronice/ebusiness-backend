import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  telephone: string;

  @Column()
  avatar?: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
