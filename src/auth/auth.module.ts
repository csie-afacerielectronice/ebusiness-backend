import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UsersService } from "./users/users.service";
import { ProfileService } from "./profile/profile.service";
import { AddressesService } from "./addresses/addresses.service";

@Module({
  controllers: [AuthController],
  providers: [UsersService, ProfileService, AddressesService],
})
export class AuthModule {}
