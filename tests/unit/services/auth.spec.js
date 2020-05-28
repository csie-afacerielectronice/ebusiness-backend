const db = require("../../../src/models");
const role = require("../../../src/utils/role");
const userFactory = require("../../factories/user");
const authService = require("../../../src/services/auth.service");

describe("Auth Service", () => {
  let user;

  beforeEach(async (done) => {
    user = await userFactory.factory({ role: role.CLIENT });
    done();
  });

  afterEach(async (done) => {
    await db.user.truncate();
    done();
  });

  it("should return an access and refresh token with a valid user id", async (done) => {
    const { accessToken } = await authService.createAccessTokens(user.id);

    expect(accessToken).toBeTruthy();
    done();
  });
});
