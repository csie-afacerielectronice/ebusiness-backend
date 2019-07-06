const { order } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createOrder: async data => {
    try {
      return await order.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateOrder: async (id, data) => {
    try {
      const result = await order.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      return await order.update({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  deleteOrder: async id => {
    try {
      const result = await order.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getOrder: async id => {
    try {
      const result = await order.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getOrders: async () => {
    try {
      return await order.findAll();
    } catch (e) {
      throw e;
    }
  }
};
