const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Order controller', () => {
  let orderObj;
  let clientObj;
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
    clientObj = await db.client.create({
      name: 'Ion',
      surname: 'Ion',
      userId: userClientObj.id
    });
    await new db.admin({
      name: 'ceva',
      userId: userAdminObj.id
    });
    const categoryObj = await db.category.create({
      name: 'ceva',
      description: 'ceva'
    });
    productObj = await db.product.create({
      name: 'ceva',
      description: 'ceva',
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
      clientId: clientObj.id
    });
    orderObj = await db.order.create({
      deliveryAddressId: addressObj.id,
      receiptAddressId: addressObj.id,
      clientId: clientObj.id
    });
    tokenClient = userClientObj.authJSON().token;
    tokenAdmin = userAdminObj.authJSON().token;
    done();
  });

  test('it should return all orders on get', done => {
    return request(app)
      .get(`/clients/${clientObj.id}/orders`)
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return an order on get by id', done => {
    return request(app)
      .get(`/clients/${clientObj.id}/orders/${orderObj.id}`)
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(200)
      .then(response => {
        expect(response.body).toBeTruthy();
        done();
      });
  });

  test('it should return an order on post', done => {
    return request(app)
      .post(`/clients/${clientObj.id}/orders`)
      .set('Authorization', `JWT ${tokenClient}`)
      .send({
        deliveryAddressId: orderObj.deliveryAddressId,
        receiptAddressId: orderObj.receiptAddressId,
        clientId: clientObj.id,
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
      .patch(`/clients/${clientObj.id}/orders/${orderObj.id}`)
      .set('Authorization', `JWT ${tokenClient}`)
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
      .delete(`/clients/${clientObj.id}/orders/${orderObj.id}`)
      .set('Authorization', `JWT ${tokenAdmin}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting order', done => {
    return request(app)
      .delete(`/clients/${clientObj.id}/orders/random`)
      .set('Authorization', `JWT ${tokenAdmin}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting order', done => {
    return request(app)
      .patch(`/clients/${clientObj.id}/orders/random`)
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting order', done => {
    return request(app)
      .get(`/clients/${clientObj.id}/orders/random`)
      .set('Authorization', `JWT ${tokenClient}`)
      .expect(404, done);
  });
});
