const { product } = require('../models');

module.exports = {
  createProduct: async data => {
    try {
      return await new product({
        ...data
      }).save();
    } catch (e) {
      throw new Error(e.message);
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
      return await product.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteProduct: async id => {
    try {
      return await product.destroy({
        where: {
          id: id
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getProduct: async id => {
    try {
      return await product.findByPk(id);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getProducts: async () => {
    try {
      return await product.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
