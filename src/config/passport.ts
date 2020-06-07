import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../app/domains/auth/repositories/user.repository";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "123456",
};

class PassportConfig {
  static init(passport: PassportStatic) {
    passport.use(
      new JWTStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await getCustomRepository(UserRepository).findOneOrFail(
            jwt_payload.sub
          );
          return done(null, user);
        } catch (e) {
          return done(null, false, { message: "token is not valid" });
        }
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
          try {
            const user = await getCustomRepository(UserRepository).findByEmail(
              email
            );

            if (!user?.verifyPassword(password)) {
              throw new Error("user is not valid");
            }
            return done(null, user);
          } catch (e) {
            return done(null, false, {
              message: "user is not valid",
            });
          }
        }
      )
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });

    return passport;
  }
}

export default PassportConfig.init(passport);
