import { ConnectionOptions } from "typeorm";
import { UserSchema } from "app/domains/auth/models/user.schema";

const config = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserSchema],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  cli: {
    migrationsDir: "src/db/migrations",
  },
} as ConnectionOptions;

export = config;
