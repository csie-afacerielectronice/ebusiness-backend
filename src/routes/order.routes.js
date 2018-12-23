const router = require('express').Router();
const passport = require('./../config/passport');
const orderController = require('../controllers/order.controller');
const clientMiddleware = require('../middlewares/client.middleware');
const orderMiddleware = require('../middlewares/order.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

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
  passport.authenticate('jwt'),
  clientMiddleware,
  orderController.postOrder
);
router.patch(
  '/clients/:clientId/orders/:id',
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
