const db = require('../src/models');
module.exports = async () => {
  await db.address.destroy({ truncate: true });
  await db.order.destroy({ truncate: true });
  await db.review.destroy({ truncate: true });
  await db.product.destroy({ truncate: true });
  await db.category.destroy({ truncate: true });
  await db.token.destroy({ truncate: true });
  await db.user.destroy({ truncate: true });
  await db.sequelize.close();
};
