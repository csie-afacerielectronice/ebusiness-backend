const app = require('../../src/app');
const request = require('supertest');

describe('Auth controller', () => {
  test('it should return a token on register', done => {
    return request(app)
      .post('/register/client')
      .send({
        user: { email: 'ceva@ceva.com', password: '123456' },
        client: { name: 'Ion', surname: 'Ion' }
      })
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

  test('it should return an error on invalid password', done => {
    return request(app)
      .post('/login')
      .send({ email: 'ceva@ceva.com', password: '12345678' })
      .expect(401, done);
  });
});
