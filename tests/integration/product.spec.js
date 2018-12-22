const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Product controller', () => {
  let categoryObj;
  let productObj;
  const data = {
    name: 'product',
    description: 'description',
    price: 14.99,
    image: '/path'
  };
  let token;
  beforeAll(async done => {
    categoryObj = await new db.category({
      name: 'category'
    }).save();
    data.categoryId = categoryObj.id;
    productObj = await new db.product({
      ...data
    }).save();
    const userObj = await db.user.findOne({
      where: { email: 'admin@test.com' }
    });
    await new db.admin({ name: 'ceva', userId: userObj.id }).save();
    token = userObj.authJSON().token;
    done();
  });

  test('it should return all products on get', done => {
    return request(app)
      .get('/products')
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return a product on get by id', done => {
    return request(app)
      .get(`/products/${productObj.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a product on post', done => {
    return request(app)
      .post('/products')
      .set('Authorization', `JWT ${token}`)
      .send(data)
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a product on patch', done => {
    return request(app)
      .patch(`/products/${productObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .send({
        name: 'ceva2'
      })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ ...data, name: 'ceva2' });
        done();
      });
  });

  test('it should return no content on delete', done => {
    return request(app)
      .delete(`/products/${productObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting product', done => {
    return request(app)
      .delete('/products/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting product', done => {
    return request(app)
      .patch('/products/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting product', done => {
    return request(app)
      .get('/products/random')
      .expect(404, done);
  });
});
