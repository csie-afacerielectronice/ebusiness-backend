const { order_product } = require('../models');

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
      const orderProductObj = await order_product.findByPk(id);
      if (orderProductObj) {
        return orderProductObj;
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      throw e;
    }
  },
  getOrderProduct: async id => {
    try {
      const result = await order_product.findByPk(id);
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
