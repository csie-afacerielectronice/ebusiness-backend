const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const orderController = require('../controllers/order.controller');
const clientMiddleware = require('../middlewares/client.middleware');
const orderMiddleware = require('../middlewares/order.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
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
  '/clients/:clientId/orders',
  passport.authenticate('jwt'),
  clientMiddleware,
  orderMiddleware,
  orderController.getOrders
);
router.get(
  '/clients/:clientId/orders/:id',
  passport.authenticate('jwt'),
  clientMiddleware,
  orderMiddleware,
  orderController.getOrder
);
router.post(
  '/clients/:clientId/orders',
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  clientMiddleware,
  orderController.postOrder
);
router.patch(
  '/clients/:clientId/orders/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  clientMiddleware,
  orderMiddleware,
  orderController.patchOrder
);
router.delete(
  '/clients/:clientId/orders/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  orderController.deleteOrder
);

module.exports = router;
