import { ConnectionOptions } from "typeorm";

const config = {
  migrations: ["src/db/migrations/*.ts"],
  cli: {
    migrationsDir: "src/db/migrations",
  },
} as ConnectionOptions;

export = config;
