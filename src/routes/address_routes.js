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
  roleMiddleware([role.ADMIN, role.CLIENT]),
  addressController.getAddresses
);
router.get(
  '/addresses/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  addressMiddleware,
  addressController.getAddress
);
router.post(
  '/addresses',
  validationMiddleware(request),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  addressController.postAddress
);
router.patch(
  '/addresses/:id',
  validationMiddleware(request),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  addressMiddleware,
  addressController.patchAddress
);
router.delete(
  '/addresses/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  addressMiddleware,
  addressController.deleteAddress
);

module.exports = router;
