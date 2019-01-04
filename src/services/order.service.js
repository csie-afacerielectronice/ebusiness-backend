const { order, product, order_product, client, address } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createOrder: async data => {
    try {
      return await order.create(
        {
          ...data
        },
        {
          include: [
            {
              model: product,
              through: {
                model: order_product,
                attributes: []
              }
            }
          ]
        }
      );
    } catch (e) {
      throw e;
    }
  },
  findOrder: async data => {
    try {
      const result = await order.findOne({ where: { ...data } });
      if (result) return result;
      else throw NOT_FOUND();
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
      const result = await order.findByPk(id);
      if (result) return result;
      else throw NOT_FOUND();
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
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getOrder: async id => {
    try {
      const result = await order.findByPk(id, {
        include: [
          {
            model: product,
            through: {
              model: order_product,
              attributes: []
            }
          }
        ]
      });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getOrders: async id => {
    try {
      if (id)
        return await order.findAll({
          where: {
            clientId: id
          },
          include: [
            {
              model: product,
              through: {
                model: order_product,
                attributes: ['quantity']
              }
            }
          ]
        });
      return await order.findAll({
        include: [
          {
            model: client
          },
          {
            model: product,
            through: {
              model: order_product,
              attributes: ['quantity']
            }
          },
          {
            model: address,
            as: 'delivery'
          },
          {
            model: address,
            as: 'receipt'
          }
        ]
      });
    } catch (e) {
      throw e;
    }
  }
};
