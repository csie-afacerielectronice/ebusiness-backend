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
  findClient: async data => {
    try {
      const result = await client.findOne({ where: { ...data } });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  updateClient: async (id, data) => {
    try {
      await client.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await client.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteClient: async id => {
    try {
      const result = await client.destroy({
        where: {
          id: id
        }
      });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getClient: async id => {
    try {
      const result = await client.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
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
