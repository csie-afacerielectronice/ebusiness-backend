const { admin } = require('../models');

module.exports = {
  createAdmin: async data => {
    try {
      return await new admin({
        ...data
      }).save();
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateAdmin: async (id, data) => {
    try {
      await admin.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      return await admin.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteAdmin: async id => {
    try {
      return await admin.destroy({
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAdmin: async id => {
    try {
      return await admin.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAdmins: async () => {
    try {
      return await admin.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
