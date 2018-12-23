const { category } = require('../models');

module.exports = {
  createCategory: async data => {
    try {
      return await new category({
        ...data
      }).save();
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
      const categoryObj = await category.findByPk(id);
      if (categoryObj) {
        return categoryObj;
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      throw e;
    }
  },
  getCategory: async id => {
    try {
      const result = await category.findByPk(id);
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
  getCategories: async () => {
    try {
      return await category.findAll();
    } catch (e) {
      throw e;
    }
  }
};
