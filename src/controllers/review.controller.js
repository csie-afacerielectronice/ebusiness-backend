const yup = require('yup');
const reviewService = require('../services/review.service');
const errorHandler = require('../utils/errorHandler');

const postSchema = yup.object().shape({
  clientId: yup.string().required(),
  score: yup.number().required(),
  content: yup.string()
});

const updateSchema = yup.object().shape({
  score: yup.number(),
  content: yup.string()
});

module.exports = {
  getReviews: async (req, res, next) => {
    try {
      const reviews = await reviewService.getReviews(req.params.productId);
      res.status(200).send(reviews);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  postReview: async (req, res, next) => {
    try {
      await postSchema.validate(req.body);
      const review = await reviewService.createReview({
        ...req.body,
        productId: req.params.productId
      });
      res.status(201).send(review);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  patchReview: async (req, res, next) => {
    try {
      await updateSchema.validate(req.body);
      const review = await reviewService.updateReview(req.params.id, req.body);
      res.status(200).send(review);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  deleteReview: async (req, res, next) => {
    try {
      await reviewService.deleteReview(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      errorHandler(e, next);
    }
  },
  getReview: async (req, res, next) => {
    try {
      const review = await reviewService.getReview(req.params.id);
      res.status(200).send(review);
    } catch (e) {
      errorHandler(e, next);
    }
  }
};
