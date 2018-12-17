const productService = require('../services/product.service');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).send(products);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  postProduct: async (req, res) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(200).send(product);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  patchProduct: async (req, res) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).send(product);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await productService.deleteProduct(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
};
