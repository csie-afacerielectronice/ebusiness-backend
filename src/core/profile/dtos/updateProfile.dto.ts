import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateProfileDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  telephone: string;
}
