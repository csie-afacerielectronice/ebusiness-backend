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
      const productObj = await product.findByPk(id);
      if (productObj) {
        return productObj;
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      if (e.status) throw e;
      else throw new Error(e.message);
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
      if (e.status) throw e;
      else throw new Error(e.message);
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
      if (e.status) throw e;
      else throw new Error(e.message);
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
