import jwt, { Secret } from "jsonwebtoken";
import { createHash } from "crypto";
import { DateTime } from "luxon";
import { APIError } from "./../../../../utils/errors";
import { getRepository } from "typeorm";
import { User } from "../models/user";
export class CreateTokensAction {
  static async execute(userId: string): Promise<string> {
    try {
      const user = await getRepository(User).findOneOrFail(userId);

      const today = DateTime.local();
      const accessExp = today.plus({ hours: 1 });

      const accessToken = jwt.sign(
        {
          sub: user.id,
          iss: "ebusiness",
          jti: createHash("md5").update(`${userId}${today.toSeconds()}`),
          iat: today.toSeconds(),
          exp: accessExp.toSeconds(),
        },
        process.env.APP_KEY as Secret
      );

      return accessToken;
    } catch (e) {
      throw APIError.FORBIDDEN();
    }
  }
}
