import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AddressesController } from "./addresses.controller";

import { AddressesService } from "./addresses.service";

import { Address } from "./entities/address.entity";

import { AddressRepository } from "./repositories/address.repository";

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [TypeOrmModule.forFeature([Address, AddressRepository])],
})
export class AddressesModule {}
