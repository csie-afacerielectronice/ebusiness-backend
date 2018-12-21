const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Auth controller', () => {
  afterAll(async done => {
    await db.user.destroy({ truncate: true });
    done();
  });

  test('it should return a token on register', done => {
    return request(app)
      .post('/register')
      .send({ email: 'ceva@ceva.com', password: '123456' })
      .expect(201)
      .then(response => {
        expect(response.body).toHaveProperty('token');
        done();
      });
  });

  test('it should return a token on login', done => {
    return request(app)
      .post('/login')
      .send({ email: 'ceva@ceva.com', password: '123456' })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('token');
        done();
      });
  });
});
