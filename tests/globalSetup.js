const db = require('../src/models');
const role = require('../src/utils/role');
module.exports = async () => {
  await db.sequelize.sync({ force: true });
  await new db.user({
    email: 'client@test.com',
    password: '123456',
    role: role.CLIENT
  }).save();
  await new db.user({
    email: 'admin@test.com',
    password: '123456',
    role: role.ADMIN
  }).save();
};
