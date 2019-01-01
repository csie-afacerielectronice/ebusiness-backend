const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const clientMiddleware = require('../middlewares/client.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const clientController = require('../controllers/client.controller');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  userId: yup.string().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  surname: yup.string()
});

router.get(
  '/clients',
  passport.authenticate('jwt'),
  adminMiddleware,
  clientController.getClients
);
router.get(
  '/clients/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  clientController.getClient
);
router.get(
  '/profile',
  passport.authenticate('jwt'),
  clientMiddleware,
  clientController.getClientProfile
);
router.post(
  '/clients',
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  clientController.postClient
);
router.patch(
  '/profile',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  clientMiddleware,
  clientController.updateClientProfile
);
router.patch(
  '/clients/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  adminMiddleware,
  clientController.patchClient
);
router.delete(
  '/clients/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  clientController.deleteClient
);

module.exports = router;
