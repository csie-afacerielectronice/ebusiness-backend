const productService = require("../services/product.service");

module.exports = {
  uploadProduct: async (req, res, next) => {
    try {
      if (!req.file) {
        let err = new Error("No image provided");
        err.status = 422;
        throw err;
      }
      const path = req.file.path.split("/");
      const product = await productService.updateProduct(req.params.id, {
        image: `${path[1]}/${path[2]}`,
      });
      res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  },
};
