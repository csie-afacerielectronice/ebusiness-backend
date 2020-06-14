import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { User } from "../../core/auth/entities/user.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  county: string;

  @Column()
  postalCode: string;

  @Column()
  isPrimary: boolean;

  @ManyToOne(
    () => User,
    user => user.addresses,
  )
  user: User;
}
