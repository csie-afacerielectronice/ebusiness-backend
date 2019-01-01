const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const categoryController = require('../controllers/category.controller');
const role = require('../utils/role');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const postSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string()
});

router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post(
  '/categories',
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  categoryController.postCategory
);
router.patch(
  '/categories/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  categoryController.patchCategory
);
router.delete(
  '/categories/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN]),
  categoryController.deleteCategory
);

module.exports = router;
