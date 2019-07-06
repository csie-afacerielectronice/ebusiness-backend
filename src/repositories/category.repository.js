const { category } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createCategory: async data => {
    try {
      return await category.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateCategory: async (id, data) => {
    try {
      const result = await category.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      return await category.update({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  deleteCategory: async id => {
    try {
      const result = await category.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getCategory: async id => {
    try {
      const result = await category.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getCategories: async () => {
    try {
      return await category.findAll();
    } catch (e) {
      throw e;
    }
  }
};
