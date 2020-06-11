import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "./store/store.module";

import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development"],
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get("DB_DIALECT", "mysql") as "mysql",
        host: configService.get("DB_HOST", "localhost") as string,
        port: configService.get("DB_PORT", 3306) as number,
        username: configService.get("DB_USERNAME", "root") as string,
        password: configService.get("DB_PASSWORD", "secret") as string,
        database: configService.get("DB_NAME", "ebusiness") as string,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
