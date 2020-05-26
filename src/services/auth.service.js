const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");
const { DateTime } = require("luxon");
const { user } = require("../models");
const { FORBIDDEN } = require("../utils/errors");

module.exports = {
  createAccessTokens: async (userId) => {
    const userObj = user.findByPk(userId);

    if (!userObj) {
      throw new FORBIDDEN("User not found");
    }

    const today = DateTime.local();
    const accessExp = today.plus({ hours: 1 });

    const accessToken = jwt.sign(
      {
        sub: userId,
        iss: "ebusiness",
        jti: createHash("md5").update(`${userId}${today.toSeconds()}`),
        iat: today.toSeconds(),
        exp: accessExp.toSeconds(),
      },
      process.env.JWT_SECRET
    );

    return {
      accessToken,
    };
  },
};
