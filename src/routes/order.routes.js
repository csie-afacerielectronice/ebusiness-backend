const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const orderController = require('../controllers/order.controller');
const role = require('../utils/role');
const orderMiddleware = require('../middlewares/order.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const postSchema = yup.object().shape({
  deliveryAddressId: yup.string().required(),
  receiptAddressId: yup.string().required(),
  products: yup.array().of(
    yup.object().shape({
      productId: yup.string().required(),
      quantity: yup.number().required()
    })
  )
});

const updateSchema = yup.object().shape({
  deliveryAddressId: yup.string(),
  receiptAddressId: yup.string()
});

router.get(
  '/orders',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  orderController.getOrders
);
router.get(
  '/orders/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  orderController.getOrder
);
router.post(
  '/orders',
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  orderController.postOrder
);
router.patch(
  '/orders/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  orderMiddleware,
  orderController.patchOrder
);
router.delete(
  '/orders/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  orderController.deleteOrder
);

module.exports = router;
