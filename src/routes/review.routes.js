const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const reviewController = require('../controllers/review.controller');
const role = require('../utils/role');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const postSchema = yup.object().shape({
  score: yup.number().required(),
  content: yup.string()
});

const updateSchema = yup.object().shape({
  score: yup.number(),
  content: yup.string()
});

router.get('/products/:productId/reviews', reviewController.getReviews);
router.get('/products/:productId/reviews/:id', reviewController.getReview);
router.post(
  '/products/:productId/reviews',
  validationMiddleware(postSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  reviewController.postReview
);
router.patch(
  '/products/:productId/reviews/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  reviewController.patchReview
);
router.delete(
  '/products/:productId/reviews/:id',
  passport.authenticate('jwt'),
  roleMiddleware([role.ADMIN, role.CLIENT]),
  reviewController.deleteReview
);

module.exports = router;
