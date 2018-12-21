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
  beforeAll(async done => {
    await db.sequelize.sync({ force: true });
    categoryObj = await new db.category({
      name: 'category'
    }).save();
    data.categoryId = categoryObj.id;
    productObj = await new db.product({
      ...data
    }).save();
    done();
  });
  afterAll(async done => {
    await db.product.destroy({ truncate: true });
    await db.category.destroy({ truncate: true });
    await db.sequelize.close();
    done();
  });

  test('it should return all products on get', done => {
    return request(app)
      .get('/products')
      .expect(200)
      .then(response => {
        expect(response.body).toHaveLength(1);
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
      .send({
        name: 'ceva2'
      })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ ...data, name: 'ceva2' });
        done()
      });
  });

  test('it should return no content on delete', done => {
    return request(app).delete(`/products/${productObj.id}`).expect(204, done);
  });

  test('it should return 404 on delete inexisting product', done => {
    return request(app).delete('/products/random').expect(404,done);
  });

  test('it should return 404 on patch inexisting product', done => {
    return request(app).patch('/products/random').expect(404, done);
  });

  test('it should return 404 on get inexisting product', done => {
    return request(app).get('/products/random').expect(404, done);
  });
});
