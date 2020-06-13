import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
  HttpCode,
} from "@nestjs/common";

import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtAuthGuard } from "./guards/refresh-jwt.guard";

import { AuthService } from "./auth.service";
import { UsersService } from "./users/users.service";

import { RegisterDto } from "./users/dtos/register.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post("/login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post("/register")
  async register(@Body() dto: RegisterDto) {
    const user = await this.usersService.createUser(dto);
    return this.authService.login(user);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get("/refresh")
  async refresh(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
