const db = require('../src/models');
const role = require('../src/utils/role');
module.exports = async () => {
  await db.sequelize.sync({ force: true });
  await db.user.create({
    email: 'client@test.com',
    password: '123456',
    role: role.CLIENT
  });
  await db.user.create({
    email: 'admin@test.com',
    password: '123456',
    role: role.ADMIN
  });
};
