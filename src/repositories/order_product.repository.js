const { order_product } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createOrderProduct: async data => {
    try {
      return await order_product.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateOrderProduct: async (id, data) => {
    try {
      const result = await order_product.findByPk(id);
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
  deleteOrderProduct: async id => {
    try {
      const result = await order_product.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getOrderProduct: async id => {
    try {
      const result = await order_product.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getOrderProducts: async () => {
    try {
      return await order_product.findAll();
    } catch (e) {
      throw e;
    }
  }
};
