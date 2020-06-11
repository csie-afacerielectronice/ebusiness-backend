import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  type: process.env.DB_DIALECT as string,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  logging: process.env.NODE_ENV === "development",
  // autoLoadEntities: true,
}));
