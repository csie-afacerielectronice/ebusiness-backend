const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Address controller', () => {
  let addressObj;
  let userObj;
  let token;
  const data = {
    street: 'ceva',
    city: 'ceva',
    county: 'ceva',
    postalCode: '291312'
  };
  beforeAll(async done => {
    userObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    const clientObj = await db.client.findOne({
      where: { userId: userObj.id }
    });
    data.clientId = clientObj.id;
    addressObj = await db.address.create({ ...data });
    token = userObj.token().token;
    done();
  });

  test('it should return all addresses on get', done => {
    return request(app)
      .get('/addresses')
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return an address on get by id', done => {
    return request(app)
      .get(`/addresses/${addressObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return an address on post', done => {
    return request(app)
      .post('/addresses')
      .set('Authorization', `JWT ${token}`)
      .send(data)
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return an address on patch', done => {
    return request(app)
      .patch(`/addresses/${addressObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .send({
        street: 'ceva2'
      })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ ...data, street: 'ceva2' });
        done();
      });
  });

  test('it should return no content on delete', done => {
    return request(app)
      .delete(`/addresses/${addressObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting address', done => {
    return request(app)
      .delete('/addresses/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting address', done => {
    return request(app)
      .patch('/addresses/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting address', done => {
    return request(app)
      .get('/addresses/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });
});
