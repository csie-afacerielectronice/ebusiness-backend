const { order } = require('../models');

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
  findOrder: async data => {
    try {
      const result = await order.findOne({ where: { ...data } });
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
  updateOrder: async (id, data) => {
    try {
      await order.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const orderObj = await order.findByPk(id);
      if (orderObj) {
        return orderObj;
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      throw e;
    }
  },
  deleteOrder: async id => {
    try {
      const result = await order.destroy({
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
  getOrder: async id => {
    try {
      const result = await order.findByPk(id);
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
  getOrders: async id => {
    try {
      return await order.findAll({
        where: {
          clientId: id
        }
      });
    } catch (e) {
      throw e;
    }
  }
};
