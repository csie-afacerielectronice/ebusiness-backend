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
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  deleteReview: async id => {
    try {
      const result = await review.destroy({
        where: {
          id
        }
      });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getReview: async id => {
    try {
      const result = await review.findByPk(id, {
        include: [
          {
            model: client
          }
        ]
      });
      if (result) return result;
      else throw NOT_FOUND();
    } catch (e) {
      throw e;
    }
  },
  getReviews: async id => {
    try {
      return await review.findAll({
        where: {
          productId: id
        },
        include: [
          {
            model: client
          }
        ]
      });
    } catch (e) {
      throw e;
    }
  }
};
