const db = require('../src/models');
module.exports = async () => {
  await db.user.destroy({ truncate: true });
  await db.sequelize.close();
};
