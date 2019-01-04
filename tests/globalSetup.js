const db = require('../src/models');
const role = require('../src/utils/role');
module.exports = async () => {
  await db.sequelize.sync({ force: true });
  const client = await db.user.create({
    email: 'client@test.com',
    password: '123456',
    role: role.CLIENT
  });
  const admin = await db.user.create({
    email: 'admin@test.com',
    password: '123456',
    role: role.ADMIN
  });
  await db.client.create({
    name: 'Ion',
    surname: 'Ion',
    userId: client.id
  });
  await db.admin.create({
    name: 'Ion',
    userId: admin.id
  });
};
