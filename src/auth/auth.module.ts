import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";

import { UsersService } from "./users/users.service";
import { ProfileService } from "./profile/profile.service";
import { AddressesService } from "./addresses/addresses.service";

import { UserRepository } from "./users/repositories/user.repository";
import { AddressRepository } from "./addresses/repositories/address.repository";
import { ProfileRepository } from "./profile/repositories/profile.repository";
import { User } from "./users/entities/user.entity";
import { Address } from "./addresses/entities/address.entity";
import { Profile } from "./profile/entities/profile.entity";

@Module({
  controllers: [AuthController],
  providers: [UsersService, ProfileService, AddressesService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      Profile,
      UserRepository,
      AddressRepository,
      ProfileRepository,
    ]),
  ],
})
export class AuthModule {}
