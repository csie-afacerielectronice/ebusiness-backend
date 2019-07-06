const { client } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createClient: async data => {
    try {
      return await client.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateClient: async (id, data) => {
    try {
      const result = await client.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      return await result.update({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  deleteClient: async id => {
    try {
      const result = await client.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getClient: async id => {
    try {
      const result = await client.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getClients: async () => {
    try {
      return await client.findAll();
    } catch (e) {
      throw e;
    }
  }
};
