const db = require('../src/models');
module.exports = async () => {
  await db.product.destroy({ truncate: true });
  await db.admin.destroy({ truncate: true });
  await db.client.destroy({ truncate: true });
  await db.user.destroy({ truncate: true });
  await db.sequelize.close();
};
