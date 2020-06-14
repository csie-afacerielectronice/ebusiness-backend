import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./core.controller";

import { UsersService } from "./auth/users.service";
import { ProfileService } from "./profile/profile.service";
import { AuthService } from "./auth/auth.service";

import { UserRepository } from "./auth/repositories/user.repository";
import { ProfileRepository } from "./profile/repositories/profile.repository";

import { User } from "./auth/entities/user.entity";
import { Profile } from "./profile/entities/profile.entity";

import { LocalStrategy } from "./auth/strategies/local.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { RefreshJwtStrategy } from "./auth/strategies/refresh-jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [
    UsersService,
    ProfileService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      UserRepository,
      ProfileRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: "1d" },
    }),
  ],
})
export class CoreModule {}
