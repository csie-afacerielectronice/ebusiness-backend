const passport = require('../config/passport');
const router = require('express').Router();
const role = require('../utils/role');
const userMiddleware = require('../middlewares/user');
const roleMiddleware = require('../middlewares/role');
const validationMiddleware = require('../middlewares/validation');
const authController = require('../controllers/auth');
const request = require('../requests/auth');

router.post(
  '/login',
  validationMiddleware(request.login),
  passport.authenticate('local'),
  authController.loginUser
);
router.post(
  '/register',
  validationMiddleware(request.user),
  authController.register
);

router.delete('/logout', passport.authenticate('jwt'), authController.logout);
router.get('/refresh', passport.authenticate('jwt'), authController.refresh);

router.get(
  '/users',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  authController.getUsers
);

router.get(
  '/profile',
  passport.authenticate('jwt'),
  roleMiddleware([role.CLIENT]),
  authController.getUser
);

router.put(
  '/profile',
  passport.authenticate('jwt'),
  roleMiddleware([role.CLIENT]),
  authController.putUser
);

router.put(
  '/users/:id',
  validationMiddleware(request.user),
  passport.authenticate('jwt'),
  userMiddleware,
  authController.putUser
);

router.delete(
  '/users/:id',
  passport.authenticate('jwt'),
  userMiddleware,
  authController.deleteUser
);

module.exports = router;
