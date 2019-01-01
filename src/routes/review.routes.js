const router = require('express').Router();
const yup = require('yup');
const passport = require('./../config/passport');
const reviewController = require('../controllers/review.controller');
const clientMiddleware = require('../middlewares/client.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const postSchema = yup.object().shape({
  clientId: yup.string().required(),
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
  clientMiddleware,
  reviewController.postReview
);
router.patch(
  '/products/:productId/reviews/:id',
  validationMiddleware(updateSchema),
  passport.authenticate('jwt'),
  clientMiddleware,
  reviewController.patchReview
);
router.delete(
  '/products/:productId/reviews/:id',
  passport.authenticate('jwt'),
  clientMiddleware,
  reviewController.deleteReview
);

module.exports = router;
