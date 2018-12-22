const router = require('express').Router();
const passport = require('./../config/passport');
const clientMiddleware = require('../middlewares/client.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const clientController = require('../controllers/client.controller');

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
  passport.authenticate('jwt'),
  clientController.postClient
);
router.patch(
  '/profile',
  passport.authenticate('jwt'),
  clientMiddleware,
  clientController.updateClientProfile
);
router.patch(
  '/clients/:id',
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
