const db = require('../../../src/models');
const role = require('../../../src/utils/role');
const userFactory = require('../../factories/user');
const tokenFactory = require('../../factories/token');
const authService = require('../../../src/services/auth_routes');

describe('Auth Service', () => {
  let user;

  beforeEach(async done => {
    user = await userFactory.factory({ role: role.CLIENT });
    done();
  });

  afterEach(async done => {
    await db.token.destroy({ truncate: true });
    await db.user.destroy({ truncate: true });
    done();
  });

  it('should return an access and refresh token with a valid user id', async done => {
    const { accessToken, refreshToken } = await authService.createAccessTokens(
      user.id
    );

    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
    done();
  });

  it('should delete a refresh token with a valid token', async done => {
    const token = await tokenFactory.factory({ userId: user.id });
    await authService.deleteRefreshToken(token.token);

    const tokens = await db.token.findAll();

    expect(tokens).toHaveLength(0);
    done();
  });
});
