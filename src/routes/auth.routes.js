const passport = require('../config/passport');
const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', passport.authenticate('local'), authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;
