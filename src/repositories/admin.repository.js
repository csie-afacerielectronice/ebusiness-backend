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
  updateAdmin: async (id, data) => {
    try {
      const result = await admin.findByPk(id);
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
  deleteAdmin: async id => {
    try {
      const result = await admin.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getAdmin: async id => {
    try {
      const result = await admin.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
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
