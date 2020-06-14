import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "./users.service";
import { ProfileService } from "../profile/profile.service";

import { RegisterDto } from "./dtos/register.dto";
import { UpdateProfileDto } from "../profile/dtos/updateProfile.dto";

import { AuthSerializer } from "./serializers/auth.serializer";
import { UserSerializer } from "./serializers/user.serializer";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await user.verifyPassword(password))) {
      return user;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return new AuthSerializer({ accessToken: this.jwtService.sign(payload) });
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.create({
      email: data.email,
      password: data.password,
    });
    await this.profileService.create({
      name: data.name,
      surname: data.surname,
      telephone: data.telephone,
      userId: user.id,
    });

    return this.login(user);
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    const profile = await this.profileService.findByUserId(userId);
    return new UserSerializer({ ...profile, ...user, profileId: profile.id });
  }

  async updateProfile(userId: string, data: UpdateProfileDto) {
    const user = await this.usersService.updateEmail(userId, data.email);
    const profile = await this.profileService.updateByUserId(userId, {
      name: data.name,
      surname: data.surname,
      telephone: data.telephone,
    });
    return new UserSerializer({ ...profile, ...user, profileId: profile.id });
  }
}
