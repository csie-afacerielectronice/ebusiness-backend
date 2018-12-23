const router = require('express').Router();
const passport = require('./../config/passport');
const reviewController = require('../controllers/review.controller');
const clientMiddleware = require('../middlewares/client.middleware');

router.get('/products/:productId/reviews', reviewController.getReviews);
router.get('/products/:productId/reviews/:id', reviewController.getReview);
router.post(
  '/products/:productId/reviews',
  passport.authenticate('jwt'),
  clientMiddleware,
  reviewController.postReview
);
router.patch(
  '/products/:productId/reviews/:id',
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
