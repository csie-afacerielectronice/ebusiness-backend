const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const { DateTime } = require('luxon');

module.exports = userId => {
  const today = DateTime.local();
  const accessExp = today.plus({ hours: 1 });
  return jwt.sign(
    {
      sub: userId,
      iss: 'ebusiness',
      jti: createHash('md5').update(`${userId}${today.toSeconds()}`),
      iat: today.toSeconds(),
      exp: accessExp.toSeconds()
    },
    process.env.JWT_SECRET
  );
};
