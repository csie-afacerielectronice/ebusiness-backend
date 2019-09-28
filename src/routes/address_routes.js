const router = require('express').Router();
const passport = require('../config/passport');
const role = require('../utils/role');
const addressController = require('../controllers/address_controller');
const roleMiddleware = require('../middlewares/role_middleware');
const addressMiddleware = require('../middlewares/address_middleware');
const validationMiddleware = require('../middlewares/validation_middleware');
const request = require('../requests/address_request');

router.get(
  '/addresses',
  passport.authenticate('jwt'),
  addressController.getAddresses
);
router.get(
  '/addresses/:id',
  passport.authenticate('jwt'),
  addressMiddleware,
  addressController.getAddress
);
router.post(
  '/addresses',
  validationMiddleware(request),
  passport.authenticate('jwt'),
  addressController.postAddress
);
router.put(
  '/addresses/:id',
  validationMiddleware(request),
  passport.authenticate('jwt'),
  addressMiddleware,
  addressController.putAddress
);
router.delete(
  '/addresses/:id',
  passport.authenticate('jwt'),
  addressMiddleware,
  addressController.deleteAddress
);

module.exports = router;
