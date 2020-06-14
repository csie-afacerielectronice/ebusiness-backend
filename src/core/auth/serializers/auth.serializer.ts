export class AuthSerializer {
  accessToken: string;

  constructor(partial: Partial<AuthSerializer>) {
    Object.assign(this, partial);
  }
}
