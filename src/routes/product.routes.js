const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const productController = require('../controllers/product.controller');
const role = require('../utils/role');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

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

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post(
  '/products',
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  productController.postProduct
);
router.patch(
  '/products/:id',
  validationMiddleware(updateSchema),
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
