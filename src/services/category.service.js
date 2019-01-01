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
      await category.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await category.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteCategory: async id => {
    try {
      const result = await category.destroy({
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
  getCategory: async id => {
    try {
      const result = await category.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
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
