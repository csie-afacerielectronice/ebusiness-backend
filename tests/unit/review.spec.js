const db = require('../../src/models');
const reviewService = require('../../src/services/review.service.js');

describe('Review service', () => {
  let reviewObj;
  let productObj;
  const data = {
    content: 'sfajbfksabfas',
    score: 2
  };
  beforeAll(async done => {
    const categoryObj = await new db.category({
      name: 'category'
    }).save();
    productObj = await new db.product({
      name: 'product',
      description: 'description',
      price: 14.99,
      image: '/path',
      categoryId: categoryObj.id
    }).save();
    data.productId = productObj.id;
    const userObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    const clientObj = await new db.client({
      name: 'Ion',
      surname: 'Ion',
      userId: userObj.id
    }).save();
    data.clientId = clientObj.id;
    reviewObj = await new db.review({ ...data }).save();
    done();
  });
  test('it should get all reviews', async done => {
    const result = await reviewService.getReviews(productObj.id);
    expect(result).not.toHaveLength(0);
    done();
  });
  test('it should create a new review', async done => {
    const result = await reviewService.createReview(data);
    expect(result).toBeTruthy();
    done();
  });
  test('it should return an error if validation is not met on new review', async done => {
    try {
      await reviewService.createReview({ content: '1' });
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });
  test('it should get a review by id', async done => {
    const result = await reviewService.getReview(reviewObj.id);
    expect(result).toMatchObject(data);
    done();
  });
  test('it should patch a review', async done => {
    const result = await reviewService.updateReview(reviewObj.id, {
      content: 'ceva2'
    });
    expect(result).toMatchObject({ ...data, content: 'ceva2' });
    done();
  });

  test('it should return an error when patching a review', async done => {
    try {
      await reviewService.updateReview(reviewObj.id, {
        content: { test: 'test' }
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });

  test('it should delete a review', async done => {
    const result = await reviewService.deleteReview(reviewObj.id);
    expect(result).toBeTruthy();
    done();
  });

  test('it should return an error when getting an inexistent review', async done => {
    try {
      await reviewService.getReview(reviewObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });

  test('it should return an error when updating an inexistent review', async done => {
    try {
      await reviewService.updateReview(reviewObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });

  test('it should return an error when deleting an inexistent review', async done => {
    try {
      await reviewService.deleteReview(reviewObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });
});
