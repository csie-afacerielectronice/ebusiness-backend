const db = require('../src/models');
module.exports = async () => {
  await db.sequelize.close();
};
