const router = require('express').Router();
const passport = require('../config/passport');
const orderController = require('../controllers/order_controller');
const role = require('../utils/role');
const orderMiddleware = require('../middlewares/order_middleware');
const roleMiddleware = require('../middlewares/role_middleware');
const validationMiddleware = require('../middlewares/validation_middleware');
const request = require('../requests/order_request');

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
  validationMiddleware(request),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  orderController.postOrder
);
router.patch(
  '/orders/:id',
  validationMiddleware(request),
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