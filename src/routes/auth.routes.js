const passport = require('../config/passport');
const yup = require('yup');
const router = require('express').Router();
const role = require('../utils/role');
const userMiddleware = require('../middlewares/user.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const authController = require('../controllers/auth.controller');

const registerClientSchema = yup.object({
  user: yup
    .object({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required()
    })
    .required(),
  client: yup.object({
    name: yup.string().required(),
    surname: yup.string().required()
  })
});

const registerAdminSchema = yup.object({
  user: yup
    .object({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required()
    })
    .required(),
  admin: yup.object({
    name: yup.string().required()
  })
});

const updateSchema = yup.object().shape({
  user: yup.object().shape({
    email: yup.string().email()
  }),
  client: yup.object().shape({
    name: yup.string(),
    surname: yup.string()
  }),
  admin: yup.object().shape({
    name: yup.string()
  })
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required()
});

router.post(
  '/login',
  validationMiddleware(loginSchema),
  passport.authenticate('local'),
  authController.loginUser
);
router.post(
  '/register/client',
  validationMiddleware(registerClientSchema),
  authController.registerClient
);
router.post(
  '/register/admin',
  validationMiddleware(registerAdminSchema),
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
