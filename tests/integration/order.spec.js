const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Order controller', () => {
  let orderObj;
  let productObj;
  let tokenClient;
  let tokenAdmin;
  beforeAll(async done => {
    const userClientObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    const userAdminObj = await db.user.findOne({
      where: {
        email: 'admin@test.com'
      }
    });
    await db.admin.create({
      name: 'ceva',
      userId: userAdminObj.id
    });
    await db.client.create({
      name: 'Ion',
      surname: 'Ion',
      userId: userClientObj.id
    });
    const categoryObj = await db.category.create({
      name: 'ceva',
      description: 'ceva'
    });
    productObj = await db.product.create({
      name: 'ceva',
      description: 'ceva',
      author: 'author',
      stock: 2,
      price: 12.99,
      categoryId: categoryObj.id
    });
    const addressObj = await db.address.create({
      name: 'ceva',
      isPrimary: true,
      city: 'ceva',
      county: 'ceva',
      postalCode: '291312',
      lat: 22.22,
      lng: 22.22,
      userId: userClientObj.id
    });
    orderObj = await db.order.create({
      deliveryAddressId: addressObj.id,
      receiptAddressId: addressObj.id,
      userId: userClientObj.id
    });
    tokenClient = userClientObj.token().token;
    tokenAdmin = userAdminObj.token().token;
    done();
  });

  test('it should return all orders on get', done => {
    return request(app)
      .get('/orders')
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return an order on get by id', done => {
    return request(app)
      .get(`/orders/${orderObj.id}`)
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(200)
      .then(response => {
        expect(response.body).toBeTruthy();
        done();
      });
  });

  test('it should return an order on post', done => {
    return request(app)
      .post('/orders')
      .set('Authorization', `JWT ${tokenClient}`)
      .send({
        deliveryAddressId: orderObj.deliveryAddressId,
        receiptAddressId: orderObj.receiptAddressId,
        products: [
          {
            productId: productObj.id,
            quantity: 1
          }
        ]
      })
      .expect(201)
      .then(response => {
        expect(response.body).toBeTruthy();
        done();
      });
  });

  test('it should return an order on patch', done => {
    return request(app)
      .patch(`/orders/${orderObj.id}`)
      .set('Authorization', `JWT ${tokenAdmin}`)
      .send({
        status: 'sent'
      })
      .expect(200)
      .then(response => {
        expect(response.body).toBeTruthy();
        done();
      });
  });

  test('it should return no content on delete', done => {
    return request(app)
      .delete(`/orders/${orderObj.id}`)
      .set('Authorization', `JWT ${tokenAdmin}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting order', done => {
    return request(app)
      .delete('/orders/random')
      .set('Authorization', `JWT ${tokenAdmin}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting order', done => {
    return request(app)
      .patch('/orders/random')
      .set('Authorization', `JWT ${tokenAdmin}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting order', done => {
    return request(app)
      .get('/orders/random')
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(404, done);
  });
});
