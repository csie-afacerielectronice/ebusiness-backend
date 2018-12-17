const { address } = require('../models');

module.exports = {
  createAddress: async data => {
    try {
      return await new address({ ...data }).save();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateAddress: async (id, data) => {
    try {
      return await address.update(
        {
          ...data
        },
        {
          where: {
            id: id
          }
        }
      );
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteAddress: async (id, data) => {
    try {
      return await address.destroy({
        where: {
          id: id,
          clientId: data.clientId
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAddress: async (id, data) => {
    try {
      return await address.findByPk(id, {
        where: {
          clientId: data.clientId
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAddresses: async (id, data) => {
    try {
      return await address.findAll({
        where: {
          clientId: data.clientId
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
