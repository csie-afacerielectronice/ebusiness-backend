const { product } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createProduct: async data => {
    try {
      return await product.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateProduct: async (id, data) => {
    try {
      await product.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await product.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteProduct: async id => {
    try {
      const result = await product.destroy({
        where: {
          id: id
        }
      });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getProduct: async id => {
    try {
      const result = await product.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getProducts: async () => {
    try {
      return await product.findAll();
    } catch (e) {
      throw e;
    }
  }
};
