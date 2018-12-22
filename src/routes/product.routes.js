const router = require('express').Router();
const passport = require('./../config/passport');
const productController = require('../controllers/product.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post(
  '/products',
  passport.authenticate('jwt'),
  adminMiddleware,
  productController.postProduct
);
router.patch(
  '/products/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  productController.patchProduct
);
router.delete(
  '/products/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router;
