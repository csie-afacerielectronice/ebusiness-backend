import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import * as request from "supertest";

import { CoreModule } from "../src/core/core.module";

import { AuthService } from "../src/core/auth/auth.service";
import { UsersService } from "../src/core/auth/users.service";

import jwt from "./../src/config/jwt.config";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  const authService = {
    validateUser: () => {
      return { email: "bar" };
    },
    login: () => {
      return { accessToken: "bar" };
    },
  };

  const usersService = {
    findById: () => {
      return { email: "user" };
    },
    findByEmail: () => {
      return { email: "user" };
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env",
          isGlobal: true,
          load: [jwt],
        }),
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          dropSchema: true,
          autoLoadEntities: true,
          synchronize: true,
        }),
        CoreModule,
      ],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/auth/login (POST) without credentials", done => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .expect(401)
      .end(done);
  });

  it("/auth/login (POST) with credentials", async done => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "test@test.com", password: "123456" })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ accessToken: "bar" });
        done();
      });
  });
});
