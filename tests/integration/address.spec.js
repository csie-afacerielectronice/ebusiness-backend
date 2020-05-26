const db = require("../../src/models");
const role = require("../../src/utils/role");
const userFactory = require("../factories/user");
const addressFactory = require("../factories/address");
const app = require("../../src/app");
const request = require("supertest");
const accessTokenGenerator = require("../utils/access_token");

describe("Address controller", () => {
  let user;
  let address;
  let accessToken;
  beforeEach(async (done) => {
    user = await userFactory.factory({
      role: role.CLIENT,
    });
    address = await addressFactory.factory({
      userId: user.id,
    });
    accessToken = accessTokenGenerator(user.id);
    done();
  });

  afterEach(async (done) => {
    await db.address.truncate();
    await db.user.truncate();
    done();
  });

  test("it should return an address on POST", async (done) => {
    const data = addressFactory.data();
    const response = await request(app)
      .post("/addresses")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      })
      .send({
        ...data,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    done();
  });

  test("it should return the user addresses on GET", async (done) => {
    const response = await request(app)
      .get("/addresses")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("meta");
    done();
  });

  test("it should return an address on GET by id", async (done) => {
    const response = await request(app)
      .get(`/addresses/${address.id}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("data");
    done();
  });

  test("it should return an address on PUT", async (done) => {
    const data = addressFactory.data();
    const response = await request(app)
      .put(`/addresses/${address.id}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      })
      .send(data);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("data");
    done();
  });

  test("it should return nothing on DELETE", async (done) => {
    const response = await request(app)
      .delete(`/addresses/${address.id}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      });
    expect(response.statusCode).toEqual(204);
    done();
  });
});
