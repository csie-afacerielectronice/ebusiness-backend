const router = require('express').Router();
const passport = require('../config/passport');
const multer = require('../config/multer');
const clientMiddleware = require('../middlewares/client.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const imageController = require('../controllers/image.controller');

router.post(
  '/profile',
  passport.authenticate('jwt'),
  clientMiddleware,
  multer.avatar.single('avatar'),
  imageController.uploadAvatar
);
router.post(
  '/products/:id/image',
  passport.authenticate('jwt'),
  adminMiddleware,
  multer.product.single('product'),
  imageController.uploadProduct
);

module.exports = router;
