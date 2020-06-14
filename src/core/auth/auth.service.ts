import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "./users.service";
import { ProfileService } from "../profile/profile.service";

import { RegisterDto } from "./dtos/register.dto";

import { AuthSerializer } from "./serializers/auth.serializer";

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
}
