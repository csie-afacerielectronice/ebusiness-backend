const { user } = require('../models');

module.exports = {
  createUser: async data => {
    try {
      return await user.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateUser: async (id, data) => {
    try {
      await user.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await user.findByPk(id);
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
  deleteUser: async id => {
    try {
      const result = await user.destroy({
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
  getUser: async id => {
    try {
      const result = await user.findByPk(id);
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
  getUsers: async () => {
    try {
      return await user.findAll();
    } catch (e) {
      throw e;
    }
  }
};
