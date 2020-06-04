export class User {
  constructor(
    private email: string,
    private password: string,
    private role: string,
    private id?: string
  ) {}

  get getEmail(): string {
    return this.email;
  }

  get getRole(): string {
    return this.role;
  }

  get getId(): string {
    return this.id || "";
  }
}
