const clientService = require('../services/client.service');
const productService = require('../services/product.service');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  uploadAvatar: async (req, res, next) => {
    try {
      if (!req.file) {
        let err = new Error('No image provided');
        err.status = 422;
        throw err;
      }
      const client = await clientService.updateClient(req.client.id, {
        avatar: req.file.path
      });
      res.status(200).send(client);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  uploadProduct: async (req, res, next) => {
    try {
      if (!req.file) {
        let err = new Error('No image provided');
        err.status = 422;
        throw err;
      }
      const product = await productService.updateProduct(req.client.id, {
        image: req.file.path
      });
      res.status(200).send(product);
    } catch (e) {
      errorHandler(e, next);
    }
  }
};
