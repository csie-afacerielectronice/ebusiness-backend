const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");
const { DateTime } = require("luxon");
const { User } = require("../../../db");
const { FORBIDDEN } = require("../../../utils/errors");

class CreateTokensAction {
  static execute(userId) {
    const userObj = User.findByPk(userId);

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
      process.env.APP_KEY
    );

    return {
      accessToken,
    };
  }
}

module.exports = CreateTokensAction;
