const { product } = require('../models');

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
      const productObj = await product.findByPk(id);
      if (productObj) {
        return productObj;
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      throw e;
    }
  },
  getProduct: async id => {
    try {
      const result = await product.findByPk(id);
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
  getProducts: async () => {
    try {
      return await product.findAll();
    } catch (e) {
      throw e;
    }
  }
};
