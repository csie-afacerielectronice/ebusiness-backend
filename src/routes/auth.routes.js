const passport = require('../config/passport');
const yup = require('yup');
const router = require('express').Router();
const validationMiddleware = require('../middlewares/validation.middleware');
const authController = require('../controllers/auth.controller');

const postSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required()
});

router.post('/login', passport.authenticate('local'), authController.loginUser);
router.post(
  '/register',
  validationMiddleware(postSchema),
  authController.registerUser
);

module.exports = router;
