const orderService = require('../services/order.service');
const orderProductService = require('../services/order_product.service');

module.exports = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await orderService.getOrders(req.user.id);
      res.status(200).send(orders);
    } catch (e) {
      next(e);
    }
  },
  postOrder: async (req, res, next) => {
    try {
      const orderObj = await orderService.createOrder({
        deliveryAddressId: req.body.deliveryAddressId,
        receiptAddressId: req.body.receiptAddressId,
        userId: req.user.id
      });
      const products = [];
      req.body.products.forEach(async item => {
        const product = await orderProductService.createOrderProduct({
          ...item,
          orderId: orderObj.id
        });
        products.push(product);
      });
      res.status(201).send({ order: orderObj, products: [...products] });
    } catch (e) {
      next(e);
    }
  },
  patchOrder: async (req, res, next) => {
    try {
      const order = await orderService.updateOrder(req.params.id, req.body);
      res.status(200).send(order);
    } catch (e) {
      next(e);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      await orderService.deleteOrder(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const order = await orderService.getOrder(req.params.id);
      res.status(200).send(order);
    } catch (e) {
      next(e);
    }
  }
};
