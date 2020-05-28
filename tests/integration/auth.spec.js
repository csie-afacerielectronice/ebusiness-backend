const db = require("../../src/models");
const role = require("../../src/utils/role");
const userFactory = require("../factories/user");
const app = require("../../src/app");
const request = require("supertest");

describe("Auth controller", () => {
  beforeEach(async (done) => {
    await userFactory.factory({
      email: "test@test.com",
      password: "123456",
      role: role.CLIENT,
    });
    done();
  });

  afterEach(async (done) => {
    await db.user.truncate();
    done();
  });

  test("it should return a token on register", async (done) => {
    const data = userFactory.data({ password: "123456" });
    const response = await request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send({
        email: data.email,
        password: data.password,
        telephone: data.telephone,
        name: data.name,
        surname: data.surname,
      });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("accessToken");
    done();
  });

  test("it should return a token on login", async (done) => {
    const response = await request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send({ email: "test@test.com", password: "123456" });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("accessToken");
    done();
  });

  test("it should return an error on invalid password", async (done) => {
    const response = await request(app)
      .post("/login")
      .send({ email: "ceva@ceva.com", password: "12345678" });
    expect(response.statusCode).toEqual(401);
    done();
  });
});
