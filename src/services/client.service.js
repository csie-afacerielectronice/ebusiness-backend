const { client } = require('../models');

module.exports = {
  createClient: async data => {
    try {
      return await new client({
        ...data
      }).save();
    } catch (e) {
      throw e;
    }
  },
  findClient: async data => {
    try {
      const result = await client.findOne({ where: { ...data } });
      if (result) return result;
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      throw e;
    }
  },
  getClient: async id => {
    try {
      const result = await client.findByPk(id);
      if (result) return result;
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
