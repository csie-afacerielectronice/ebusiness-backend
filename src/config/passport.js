const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { user } = require('../models');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    const userObj = await user.findOne({
      where: { email: jwt_payload.context.email }
    });
    if (!userObj) done(null, false, { message: 'token is not valid' });
    done(null, userObj);
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      const userObj = await user.findOne({ where: { email } });
      if (!userObj || !userObj.isPasswordValid(password))
        return done(null, false, {
          message: 'passwords do not match'
        });
      return done(null, userObj);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
