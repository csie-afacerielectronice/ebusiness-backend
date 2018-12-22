const router = require('express').Router();
const passport = require('./../config/passport');
const productController = require('../controllers/product.controller');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post(
  '/products',
  passport.authenticate('jwt'),
  productController.postProduct
);
router.patch(
  '/products/:id',
  passport.authenticate('jwt'),
  productController.patchProduct
);
router.delete(
  '/products/:id',
  passport.authenticate('jwt'),
  productController.deleteProduct
);

module.exports = router;
