const router = require('express').Router();
const passport = require('../config/passport');
const multer = require('../config/multer');
const roleMiddleware = require('../middlewares/role');
const role = require('../utils/role');
const imageController = require('../controllers/image');

router.post(
  '/products/:id/image',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  multer.product.single('product'),
  imageController.uploadProduct
);

module.exports = router;
