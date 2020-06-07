import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { User } from "../../auth/models/user";

export interface AddressDTO {
  id: string;
  street: string;
  city: string;
  county: string;
  postalCode: string;
  isPrimary: boolean;
  user: User;
}
@Entity()
export class Address implements AddressDTO {
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
