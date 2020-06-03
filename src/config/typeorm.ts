import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";

const config = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
} as ConnectionOptions;

export default createConnection(config);
