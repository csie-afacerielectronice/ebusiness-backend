const db = require('../src/models');
module.exports = async () => {
  await db.sequelize.sync({ force: true });
  await new db.user({ email: 'test@test.com', password: '123456' }).save();
};
