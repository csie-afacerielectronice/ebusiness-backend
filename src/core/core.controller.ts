import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Patch,
} from "@nestjs/common";

import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { RefreshJwtAuthGuard } from "./auth/guards/refresh-jwt.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

import { AuthService } from "./auth/auth.service";
import { UsersService } from "./auth/users.service";

import { RegisterDto } from "./auth/dtos/register.dto";
import { UpdateProfileDto } from "./profile/dtos/updateProfile.dto";
import { UpdatePasswordDto } from "./auth/dtos/updatePassword.dto";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
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
    return this.authService.register(dto);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get("/refresh")
  async refresh(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/profile")
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Patch("/password")
  async updatePassword(@Request() req: any, @Body() dto: UpdatePasswordDto) {
    this.usersService.updatePassword(req.user.id, dto);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/avatar")
  async updateAvatar(@Request() req: any) {
    return null;
  }
}
