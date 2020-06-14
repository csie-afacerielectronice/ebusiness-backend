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
} from "@nestjs/common";

import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { RefreshJwtAuthGuard } from "./auth/guards/refresh-jwt.guard";

import { AuthService } from "./auth/auth.service";

import { RegisterDto } from "./auth/dtos/register.dto";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
