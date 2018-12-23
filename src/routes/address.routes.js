const router = require('express').Router();
const passport = require('./../config/passport');
const addressController = require('../controllers/address.controller');
const clientMiddleware = require('../middlewares/client.middleware');
const addressMiddleware = require('../middlewares/address.middleware');

router.get(
  '/clients/:clientId/addresses',
  passport.authenticate('jwt'),
  clientMiddleware,
  addressMiddleware,
  addressController.getAddresses
);
router.get(
  '/clients/:clientId/addresses/:id',
  passport.authenticate('jwt'),
  clientMiddleware,
  addressMiddleware,
  addressController.getAddress
);
router.post(
  '/clients/:clientId/addresses',
  passport.authenticate('jwt'),
  clientMiddleware,
  addressController.postAddress
);
router.patch(
  '/clients/:clientId/addresses/:id',
  passport.authenticate('jwt'),
  clientMiddleware,
  addressMiddleware,
  addressController.patchAddress
);
router.delete(
  '/clients/:clientId/addresses/:id',
  passport.authenticate('jwt'),
  clientMiddleware,
  addressMiddleware,
  addressController.deleteAddress
);

module.exports = router;
