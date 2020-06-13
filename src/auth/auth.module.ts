import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";

import { UsersService } from "./users/users.service";
import { ProfileService } from "./profile/profile.service";
import { AddressesService } from "./addresses/addresses.service";
import { AuthService } from "./auth.service";

import { UserRepository } from "./users/repositories/user.repository";
import { AddressRepository } from "./addresses/repositories/address.repository";
import { ProfileRepository } from "./profile/repositories/profile.repository";

import { User } from "./users/entities/user.entity";
import { Address } from "./addresses/entities/address.entity";
import { Profile } from "./profile/entities/profile.entity";

import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshJwtStrategy } from "./strategies/refresh-jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [
    UsersService,
    ProfileService,
    AddressesService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      Profile,
      UserRepository,
      AddressRepository,
      ProfileRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: "60s" },
    }),
  ],
})
export class AuthModule {}
