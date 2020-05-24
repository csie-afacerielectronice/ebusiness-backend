const orderService = require('../services/order_service');

module.exports = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await orderService.getOrders(
        req.client ? req.client.id : null
      );
      res.status(200).send(orders);
    } catch (e) {
      next(e);
    }
  },
  postOrder: async (req, res, next) => {
    try {
      const order = await orderService.createOrder({
        deliveryAddressId: req.body.deliveryAddressId,
        receiptAddressId: req.body.receiptAddressId,
        clientId: req.client.id,
        status: 'received'
      });
      req.body.products.forEach(async item => {
        await orderProductService.createOrderProduct({
          ...item,
          orderId: order.id
        });
      });
      const orderObj = await orderService.getOrder(order.id);
      res.status(201).send({ order: orderObj });
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
