const router = require('express').Router();
const yup = require('yup');
const passport = require('../config/passport');
const role = require('../utils/role');
const addressController = require('../controllers/address.controller');
const roleMiddleware = require('../middlewares/role.middleware');
const addressMiddleware = require('../middlewares/address.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const postSchema = yup.object().shape({
  street: yup.string().required(),
  // isPrimary: yup.boolean().required(),
  city: yup.string().required(),
  county: yup.string().required(),
  postalCode: yup.string().required()
  // lat: yup.number().required(),
  // lng: yup.number().required()
});

const updateSchema = yup.object().shape({
  street: yup.string(),
  // isPrimary: yup.boolean(),
  city: yup.string(),
  county: yup.string(),
  postalCode: yup.string()
  // lat: yup.number(),
  // lng: yup.number()
});

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
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  addressController.postAddress
);
router.patch(
  '/addresses/:id',
  validationMiddleware(updateSchema),
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
