const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Review controller', () => {
  let reviewObj;
  let productObj;
  let token;
  const data = {
    content: 'sfajbfksabfas',
    score: 2
  };
  beforeAll(async done => {
    const categoryObj = await db.category.create({
      name: 'category',
      description: 'description'
    });
    productObj = await db.product.create({
      name: 'product',
      description: 'description',
      price: 14.99,
      image: '/path',
      categoryId: categoryObj.id
    });
    data.productId = productObj.id;
    const userObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    const clientObj = await db.client.create({
      name: 'Ion',
      surname: 'Ion',
      userId: userObj.id
    });
    data.clientId = clientObj.id;
    reviewObj = await db.review.create({ ...data });
    token = userObj.authJSON().token;
    done();
  });

  test('it should return all reviews on get', done => {
    return request(app)
      .get(`/products/${productObj.id}/reviews`)
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return a review on get by id', done => {
    return request(app)
      .get(`/products/${productObj.id}/reviews/${reviewObj.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a review on post', done => {
    return request(app)
      .post(`/products/${productObj.id}/reviews`)
      .set('Authorization', `JWT ${token}`)
      .send(data)
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a review on patch', done => {
    return request(app)
      .patch(`/products/${productObj.id}/reviews/${reviewObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .send({
        content: 'ceva2'
      })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ ...data, content: 'ceva2' });
        done();
      });
  });

  test('it should return no content on delete', done => {
    return request(app)
      .delete(`/products/${productObj.id}/reviews/${reviewObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting review', done => {
    return request(app)
      .delete(`/products/${productObj.id}/reviews/random`)
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting review', done => {
    return request(app)
      .patch(`/products/${productObj.id}/reviews/random`)
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting review', done => {
    return request(app)
      .get(`/products/${productObj.id}/reviews/random`)
      .expect(404, done);
  });
});
