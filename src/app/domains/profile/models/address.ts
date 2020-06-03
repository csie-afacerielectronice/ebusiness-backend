import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { User } from "app/domains/auth/models/user";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  county!: string;

  @Column()
  postalCode!: string;

  @Column()
  isPrimary!: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;
}
