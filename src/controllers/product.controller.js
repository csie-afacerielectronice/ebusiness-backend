const productService = require("../services/product.service");

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await productService.getProducts();
      res.status(200).send(products);
    } catch (e) {
      next(e);
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).send(product);
    } catch (e) {
      next(e);
    }
  },
  patchProduct: async (req, res, next) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      await productService.deleteProduct(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const product = await productService.getProduct(req.params.id);
      res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  },
};
