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
  UploadedFile,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { diskStorage } from "multer";

import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { RefreshJwtAuthGuard } from "./auth/guards/refresh-jwt.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

import { AuthService } from "./auth/auth.service";
import { UsersService } from "./auth/users.service";

import { RegisterDto } from "./auth/dtos/register.dto";
import { UpdateProfileDto } from "./profile/dtos/updateProfile.dto";
import { UpdatePasswordDto } from "./auth/dtos/updatePassword.dto";

import { editFileName, imageFileFilter } from "src/utils/file-uploading.utils";

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
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: "./public/assets/avatars",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Patch("/avatar")
  async updateAvatar(@Request() req: any, @UploadedFile() file: any) {
    const path = "assets/avatars";
    return this.authService.updateAvatar(req.user, `${path}/${file.filename}`);
  }
}
