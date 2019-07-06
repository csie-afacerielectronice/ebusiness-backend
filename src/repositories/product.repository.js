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
      const result = await product.findByPk(id);
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
  deleteProduct: async id => {
    try {
      const result = await product.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getProduct: async id => {
    try {
      const result = await product.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
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
