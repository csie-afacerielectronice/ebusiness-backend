const yup = require('yup');
const productService = require('../services/product.service');
const errorHandler = require('../utils/errorHandler');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  categoryId: yup.string().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
  categoryId: yup.string()
});

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
      await postSchema.validate(req.body);
      const product = await productService.createProduct(req.body);
      res.status(201).send(product);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  patchProduct: async (req, res) => {
    try {
      await updateSchema.validate(req.body);
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
