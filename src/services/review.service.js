const { review } = require('../models');

module.exports = {
  createReview: async data => {
    try {
      return await new review({
        ...data
      }).save();
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
      const reviewObj = await review.findByPk(id);
      if (reviewObj) {
        return reviewObj;
      } else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
    } catch (e) {
      throw e;
    }
  },
  getReview: async id => {
    try {
      const result = await review.findByPk(id);
      if (result) return result;
      else {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
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
