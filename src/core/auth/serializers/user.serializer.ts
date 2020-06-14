import { Exclude } from "class-transformer";

export class UserSerializer {
  id: string;
  email: string;
  role: string;
  name: string;
  surname: string;
  avatar: string;
  telephone: string;
  profileId: string;

  @Exclude()
  password: string;

  @Exclude()
  userId: string;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}
