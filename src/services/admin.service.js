const { admin } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createAdmin: async data => {
    try {
      return await admin.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  findAdmin: async data => {
    try {
      const result = await admin.findOne({ where: { ...data } });
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
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
      const result = await admin.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteAdmin: async id => {
    try {
      const result = await admin.destroy({
        where: {
          id: id
        }
      });
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getAdmin: async id => {
    try {
      const result = await admin.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getAdmins: async () => {
    try {
      return await admin.findAll();
    } catch (e) {
      throw e;
    }
  }
};
