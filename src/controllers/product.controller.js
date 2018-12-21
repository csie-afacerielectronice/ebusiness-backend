const productService = require('../services/product.service');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).send(products);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  postProduct: async (req, res) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(200).send(product);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  patchProduct: async (req, res) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      if (product) res.status(200).send(product);
      else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (product) {
        res.sendStatus(204);
      } else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await productService.getProduct(req.params.id);
      if (product) {
        res.status(200).send(product);
      } else res.sendStatus(404);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
