import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "./store/store.module";

import app from "./config/app.config";
import database from "./config/database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get("database"),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [app, database],
    }),

    AuthModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}