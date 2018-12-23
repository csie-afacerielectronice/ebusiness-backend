const yup = require('yup');
const orderService = require('../services/order.service');
const orderProductService = require('../services/order_product.service');
const errorHandler = require('../utils/errorHandler');

const postSchema = yup.object().shape({
  deliveryAddressId: yup.string().required(),
  receiptAddressId: yup.string().required(),
  products: yup.array().of(
    yup.object().shape({
      productId: yup.string().required(),
      quantity: yup.number().required()
    })
  )
});

const updateSchema = yup.object().shape({
  deliveryAddressId: yup.string(),
  receiptAddressId: yup.string()
});

module.exports = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await orderService.getOrders(req.params.clientId);
      res.status(200).send(orders);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  postOrder: async (req, res, next) => {
    try {
      await postSchema.validate(req.body);
      const orderObj = await orderService.createOrder({
        deliveryAddressId: req.body.deliveryAddressId,
        receiptAddressId: req.body.receiptAddressId,
        clientId: req.params.clientId
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
      errorHandler(e, next);
    }
  },
  patchOrder: async (req, res, next) => {
    try {
      await updateSchema.validate(req.body);
      const order = await orderService.updateOrder(req.params.id, req.body);
      res.status(200).send(order);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      await orderService.deleteOrder(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const order = await orderService.getOrder(req.params.id);
      res.status(200).send(order);
    } catch (e) {
      errorHandler(e, next);
    }
  }
};
