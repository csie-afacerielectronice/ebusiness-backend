const router = require('express').Router();
const passport = require('../config/passport');
const productController = require('../controllers/product');
const role = require('../utils/role');
const roleMiddleware = require('../middlewares/role');
const validationMiddleware = require('../middlewares/validation');
const request = require('../requests/product');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post(
  '/products',
  validationMiddleware(request),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  productController.postProduct
);
router.patch(
  '/products/:id',
  validationMiddleware(request),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  productController.patchProduct
);
router.delete(
  '/products/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  productController.deleteProduct
);

module.exports = router;
