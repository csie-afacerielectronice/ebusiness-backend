const { review, client } = require('../models');
const { NOT_FOUND } = require('../utils/errors');

module.exports = {
  createReview: async data => {
    try {
      return await review.create({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  updateReview: async (id, data) => {
    try {
      const result = await review.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      return await result.update({
        ...data
      });
    } catch (e) {
      throw e;
    }
  },
  deleteReview: async id => {
    try {
      const result = await review.findByPk(id);
      if (!result) {
        throw NOT_FOUND();
      }
      await result.destroy();
    } catch (e) {
      throw e;
    }
  },
  getReview: async id => {
    try {
      const result = await review.findByPk(id);
      if (result) return result;
      throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getReviews: async () => {
    try {
      return await review.findAll();
    } catch (e) {
      throw e;
    }
  }
};
