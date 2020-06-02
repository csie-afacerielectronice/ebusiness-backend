import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJWT } from "passport-jwt";
import { user } from "../db";

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    const userObj = await user.findByPk(jwt_payload.sub);
    if (!userObj) done(null, false, { message: "token is not valid" });
    done(null, userObj);
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      const userObj = await user.findOne({ where: { email } });
      if (!userObj || !userObj.isPasswordValid(password))
        return done(null, false, {
          message: "passwords do not match",
        });
      return done(null, userObj);
    }
  )
);

export default passport;
