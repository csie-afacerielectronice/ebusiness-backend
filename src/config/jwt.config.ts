import { registerAs } from "@nestjs/config";
import { ExtractJwt } from "passport-jwt";

export default registerAs("jwt", () => ({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.APP_KEY,
}));
