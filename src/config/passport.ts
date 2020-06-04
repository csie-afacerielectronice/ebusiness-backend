import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    const userObj = null;
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
      const userObj = null;
      if (!userObj) {
        return done(null, false, {
          message: "passwords do not match",
        });
      }

      return done(null, userObj);
    }
  )
);

export default passport;
