import { ConnectionOptions } from "typeorm";
import { User } from "../app/domains/auth/models/user";
import { Address } from "../app/domains/profile/models/address";
import { Profile } from "../app/domains/profile/models/profile";

const config = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Address, Profile],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  migrations: ["src/db/migrations/*.ts"],
  cli: {
    migrationsDir: "src/db/migrations",
  },
} as ConnectionOptions;

export = config;
