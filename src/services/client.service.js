const { client } = require('../models');

module.exports = {
  createClient: async data => {
    try {
      return await new client({
        ...data
      }).save();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  findClient: async data => {
    try {
      return await client.findOne({ where: { ...data } });
    } catch (e) {
      throw new Error(e.message);
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
      return await client.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteClient: async id => {
    try {
      return await client.destroy({
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getClient: async id => {
    try {
      return await client.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getClients: async () => {
    try {
      return await client.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
