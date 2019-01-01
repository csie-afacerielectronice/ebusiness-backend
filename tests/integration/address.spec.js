const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Address controller', () => {
  let addressObj;
  let userObj;
  let token;
  const data = {
    name: 'ceva',
    isPrimary: true,
    city: 'ceva',
    county: 'ceva',
    postalCode: '291312',
    lat: 22.22,
    lng: 22.22
  };
  beforeAll(async done => {
    userObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    await db.client.create({
      name: 'Ion',
      surname: 'Ion',
      userId: userObj.id
    });
    data.userId = userObj.id;
    addressObj = await db.address.create({ ...data });
    token = userObj.token().token;
    done();
  });

  test('it should return all addresses on get', done => {
    return request(app)
      .get(`/users/${userObj.id}/addresses`)
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return an address on get by id', done => {
    return request(app)
      .get(`/users/${userObj.id}/addresses/${addressObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return an address on post', done => {
    return request(app)
      .post(`/users/${userObj.id}/addresses`)
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
      .patch(`/users/${userObj.id}/addresses/${addressObj.id}`)
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
      .delete(`/users/${userObj.id}/addresses/${addressObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting address', done => {
    return request(app)
      .delete(`/users/${userObj.id}/addresses/random`)
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting address', done => {
    return request(app)
      .patch(`/users/${userObj.id}/addresses/random`)
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting address', done => {
    return request(app)
      .get(`/users/${userObj.id}/addresses/random`)
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });
});
