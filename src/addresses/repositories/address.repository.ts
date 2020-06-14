import { EntityRepository, Repository } from "typeorm";
import { Address } from "../entities/address.entity";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
