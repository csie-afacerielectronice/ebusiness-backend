const {
  address,
  Sequelize: { Op }
} = require('../models');
const ServiceHelper = require('../utils/service_helper');

class Address extends ServiceHelper {
  async save(data) {
    const addressObj = await super.save(data);
    if (addressObj.isPrimary) {
      const addresses = await super.get({
        userId: addressObj.userId,
        id: { [Op.not]: addressObj.id }
      });
      await Promise.all(
        addresses.rows.map(item => item.update(item.id, { isPrimary: false }))
      );
    }
    return addressObj;
  }

  async update(id, data, query = {}) {
    const addressObj = await super.update(id, data, query);
    if (addressObj.isPrimary) {
      const addresses = await super.get({
        userId: addressObj.userId,
        id: { [Op.not]: addressObj.id }
      });
      await Promise.all(
        addresses.rows.map(item => item.update(item.id, { isPrimary: false }))
      );
    }
    return addressObj;
  }
}

module.exports = new Address(address);
