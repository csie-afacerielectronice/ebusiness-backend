const db = require('../src/models');

module.exports = async () => {
  await db.sequelize.sync({ force: true });
};
