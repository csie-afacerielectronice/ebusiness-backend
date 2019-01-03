const clientService = require('../services/client.service');
const productService = require('../services/product.service');

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
      next(e);
    }
  },
  uploadProduct: async (req, res, next) => {
    try {
      if (!req.file) {
        let err = new Error('No image provided');
        err.status = 422;
        throw err;
      }
      const path = req.file.path.split('/');
      const product = await productService.updateProduct(req.params.id, {
        image: `${path[1]}/${path[2]}`
      });
      res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  }
};
