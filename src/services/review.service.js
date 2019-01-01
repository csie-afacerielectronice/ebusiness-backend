const { review } = require('../models');
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
      await review.update(
        {
          ...data
        },
        {
          where: {
            id
          }
        }
      );
      const result = await review.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteReview: async id => {
    try {
      const result = await review.destroy({
        where: {
          id: id
        }
      });
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getReview: async id => {
    try {
      const result = await review.findByPk(id);
      if (result) return result;
      else NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getReviews: async id => {
    try {
      return await review.findAll({
        where: {
          productId: id
        }
      });
    } catch (e) {
      throw e;
    }
  }
};
