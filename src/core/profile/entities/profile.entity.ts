import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "../../auth/entities/user.entity";

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

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  @JoinColumn()
  userId: string;

  @OneToOne(() => User)
  user: User;
}
