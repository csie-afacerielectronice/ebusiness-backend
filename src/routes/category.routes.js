const router = require('express').Router();
const passport = require('./../config/passport');
const categoryController = require('../controllers/category.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post(
  '/categories',
  passport.authenticate('jwt'),
  adminMiddleware,
  categoryController.postCategory
);
router.patch(
  '/categories/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  categoryController.patchCategory
);
router.delete(
  '/categories/:id',
  passport.authenticate('jwt'),
  adminMiddleware,
  categoryController.deleteCategory
);

module.exports = router;
