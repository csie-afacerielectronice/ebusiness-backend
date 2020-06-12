import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

dotenv.config();

const config = {
  type: process.env.DB_DIALECT as string,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  logging: process.env.NODE_ENV === "development",
  migrations: ["src/db/migrations/*.ts"],
  cli: {
    migrationsDir: "src/db/migrations",
  },
} as ConnectionOptions;

export = config;
