import jwt, { Secret } from "jsonwebtoken";
import { createHash } from "crypto";
import { DateTime } from "luxon";
import { APIError } from "./../../../../utils/errors";

export class CreateTokensAction {
  static execute(userId: string): string {
    const userObj = User.findByPk(userId);

    if (!userObj) {
      throw APIError.FORBIDDEN();
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
      process.env.APP_KEY as Secret
    );

    return accessToken;
  }
}
