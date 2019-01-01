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
      await order_product.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await order_product.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteOrderProduct: async id => {
    try {
      const result = await order_product.destroy({
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
  getOrderProduct: async id => {
    try {
      const result = await order_product.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getOrderProducts: async id => {
    try {
      return await order_product.findAll({
        where: {
          orderId: id
        }
      });
    } catch (e) {
      throw e;
    }
  }
};
