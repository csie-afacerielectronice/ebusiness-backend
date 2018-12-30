const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Client controller', () => {
  let clientObj;
  const data = {
    name: 'Ion',
    surname: 'Ion'
  };
  let clientToken;
  let adminToken;
  beforeAll(async done => {
    const userAdminObj = await db.user.findOne({
      where: { email: 'admin@test.com' }
    });
    const userClientObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    data.userId = userClientObj.id;
    clientObj = await db.client.create(data);
    await db.admin.create({ name: 'ceva', userId: userAdminObj.id });
    clientToken = userClientObj.authJSON().token;
    adminToken = userAdminObj.authJSON().token;
    done();
  });

  test('it should return all clients on get', done => {
    return request(app)
      .get('/clients')
      .set('Authorization', `JWT ${adminToken}`)
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return a client on get by id', done => {
    return request(app)
      .get(`/clients/${clientObj.id}`)
      .set('Authorization', `JWT ${adminToken}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a client on post', done => {
    return request(app)
      .post('/clients')
      .set('Authorization', `JWT ${clientToken}`)
      .send(data)
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a client on get profile', done => {
    return request(app)
      .get('/profile')
      .set('Authorization', `JWT ${clientToken}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a client on patch', done => {
    return request(app)
      .patch(`/clients/${clientObj.id}`)
      .set('Authorization', `JWT ${adminToken}`)
      .send({
        name: 'ceva2'
      })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ ...data, name: 'ceva2' });
        done();
      });
  });

  test('it should return a client on patch profile', done => {
    return request(app)
      .patch('/profile')
      .set('Authorization', `JWT ${clientToken}`)
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
      .delete(`/clients/${clientObj.id}`)
      .set('Authorization', `JWT ${adminToken}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting client', done => {
    return request(app)
      .delete('/clients/random')
      .set('Authorization', `JWT ${adminToken}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting client', done => {
    return request(app)
      .patch('/clients/random')
      .set('Authorization', `JWT ${adminToken}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting client', done => {
    return request(app)
      .get('/clients/random')
      .set('Authorization', `JWT ${adminToken}`)
      .expect(404, done);
  });
});
