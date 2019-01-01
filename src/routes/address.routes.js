const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const addressController = require('../controllers/address.controller');
const clientMiddleware = require('../middlewares/client.middleware');
const addressMiddleware = require('../middlewares/address.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  isPrimary: yup.boolean().required(),
  city: yup.string().required(),
  county: yup.string().required(),
  postalCode: yup.string().required(),
  lat: yup.number().required(),
  lng: yup.number().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  isPrimary: yup.boolean(),
  city: yup.string(),
  county: yup.string(),
  postalCode: yup.string(),
  lat: yup.number(),
  lng: yup.number()
});

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
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  clientMiddleware,
  addressController.postAddress
);
router.patch(
  '/clients/:clientId/addresses/:id',
  validationMiddleware(updateSchema),
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
