const { user } = require('../models');

module.exports = {
  createUser: async data => {
    try {
      return await new user({
        ...data
      }).save();
    } catch (e) {
      throw new Error(e.message);
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
      return await user.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteUser: async id => {
    try {
      return await user.destroy({
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getUser: async id => {
    try {
      return await user.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getUsers: async () => {
    try {
      return await user.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
