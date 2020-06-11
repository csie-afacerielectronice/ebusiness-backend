import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";

import { UsersService } from "./users/users.service";
import { ProfileService } from "./profile/profile.service";
import { AddressesService } from "./addresses/addresses.service";

import { Profile } from "./profile/entities/profile.entity";
import { Address } from "./addresses/entities/address.entity";
import { UserRepository } from "./users/repositories/user.repository";

@Module({
  controllers: [AuthController],
  providers: [UsersService, ProfileService, AddressesService],
  imports: [TypeOrmModule.forFeature([UserRepository, Profile, Address])],
})
export class AuthModule {}
