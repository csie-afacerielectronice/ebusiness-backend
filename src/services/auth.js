const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const { DateTime } = require('luxon');
const { token } = require('../models');

module.exports = {
  createAccessTokens: async userId => {
    const today = DateTime.local();
    const accessExp = today.plus({ hours: 1 });
    const refreshExp = today.plus({ weeks: 1 });

    const accessToken = jwt.sign(
      {
        sub: this.id,
        iss: 'ebusiness',
        jti: createHash('md5').update(`${userId}${today.toSeconds()}`),
        iat: today.toSeconds(),
        exp: accessExp.toSeconds()
      },
      process.env.JWT_SECRET
    );

    const refreshToken = jwt.sign(
      {
        sub: this.id,
        iss: 'ebusiness',
        jti: createHash('md5').update(`${userId}${today.toSeconds()}`),
        iat: today.toSeconds(),
        exp: refreshExp.toSeconds()
      },
      process.env.JWT_SECRET
    );

    const dbToken = await token.findOne({
      where: {
        userId
      }
    });

    if (dbToken) {
      await dbToken.update({
        token: refreshToken,
        expiresAt: refreshExp.toSQL()
      });
    } else {
      await token.create({
        token: refreshToken,
        expiresAt: refreshExp.toSQL(),
        userId,
        type: 'refresh'
      });
    }

    return {
      accessToken,
      refreshToken
    };
  },
  deleteRefreshToken: async userId => {
    const dbToken = await token.findOne({
      where: {
        userId
      }
    });
    await dbToken.destroy();
  }
};
