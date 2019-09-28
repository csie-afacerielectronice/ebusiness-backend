const reviewService = require('../services/review_routes');

module.exports = {
  getReviews: async (req, res, next) => {
    try {
      const reviews = await reviewService.getReviews(req.params.productId);
      res.status(200).send(reviews);
    } catch (e) {
      next(e);
    }
  },
  postReview: async (req, res, next) => {
    try {
      const review = await reviewService.createReview({
        ...req.body,
        productId: req.params.productId,
        clientId: req.client.id
      });
      const reviewObj = await reviewService.getReview(review.id);
      res.status(201).send(reviewObj);
    } catch (e) {
      next(e);
    }
  },
  patchReview: async (req, res, next) => {
    try {
      const review = await reviewService.updateReview(req.params.id, req.body);
      res.status(200).send(review);
    } catch (e) {
      next(e);
    }
  },
  deleteReview: async (req, res, next) => {
    try {
      await reviewService.deleteReview(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  getReview: async (req, res, next) => {
    try {
      const review = await reviewService.getReview(req.params.id);
      res.status(200).send(review);
    } catch (e) {
      next(e);
    }
  }
};
