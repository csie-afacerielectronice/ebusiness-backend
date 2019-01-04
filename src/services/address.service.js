const { address } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createAddress: async data => {
    try {
      return await address.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  findAddress: async data => {
    try {
      const result = await address.findOne({ where: { ...data } });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  updateAddress: async (id, data) => {
    try {
      await address.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await address.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteAddress: async id => {
    try {
      const result = await address.destroy({
        where: {
          id
        }
      });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getAddress: async id => {
    try {
      const result = await address.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getAddresses: async id => {
    try {
      return await address.findAll({
        where: {
          clientId: id
        }
      });
    } catch (e) {
      throw e;
    }
  }
};
