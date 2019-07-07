const passport = require('../config/passport');
const router = require('express').Router();
const role = require('../utils/role');
const userMiddleware = require('../middlewares/user.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const authController = require('../controllers/auth.controller');
const request = require('../requests/auth.request');

router.post(
  '/login',
  validationMiddleware(request.login),
  passport.authenticate('local'),
  authController.loginUser
);
router.post(
  '/register/client',
  validationMiddleware(request.client),
  authController.registerClient
);
router.post(
  '/register/admin',
  validationMiddleware(request.admin),
  authController.registerAdmin
);
router.get(
  '/users',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  authController.getUsers
);

router.get(
  '/users/:id',
  passport.authenticate('jwt'),
  userMiddleware,
  authController.getUser
);

router.get(
  '/profile',
  passport.authenticate('jwt'),
  roleMiddleware([role.CLIENT]),
  authController.getUser
);

router.patch(
  '/profile',
  passport.authenticate('jwt'),
  roleMiddleware([role.CLIENT]),
  authController.patchUser
);

router.patch(
  '/users/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  userMiddleware,
  authController.patchUser
);

router.delete(
  '/users/:id',
  passport.authenticate('jwt'),
  userMiddleware,
  authController.deleteUser
);

module.exports = router;
