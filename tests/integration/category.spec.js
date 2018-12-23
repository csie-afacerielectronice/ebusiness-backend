const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/models');

describe('Category controller', () => {
  let categoryObj;
  const data = {
    name: 'category',
    description: 'description'
  };
  let token;
  beforeAll(async done => {
    categoryObj = await new db.category(data).save();
    const userObj = await db.user.findOne({
      where: { email: 'admin@test.com' }
    });
    await new db.admin({ name: 'ceva', userId: userObj.id }).save();
    token = userObj.authJSON().token;
    done();
  });

  test('it should return all categories on get', done => {
    return request(app)
      .get('/categories')
      .expect(200)
      .then(response => {
        expect(response.body).not.toHaveLength(0);
        done();
      });
  });

  test('it should return a category on get by id', done => {
    return request(app)
      .get(`/categories/${categoryObj.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a category on post', done => {
    return request(app)
      .post('/categories')
      .set('Authorization', `JWT ${token}`)
      .send(data)
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject(data);
        done();
      });
  });

  test('it should return a category on patch', done => {
    return request(app)
      .patch(`/categories/${categoryObj.id}`)
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
      .delete(`/categories/${categoryObj.id}`)
      .set('Authorization', `JWT ${token}`)
      .expect(204, done);
  });

  test('it should return 404 on delete inexisting category', done => {
    return request(app)
      .delete('/categories/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on patch inexisting category', done => {
    return request(app)
      .patch('/categories/random')
      .set('Authorization', `JWT ${token}`)
      .expect(404, done);
  });

  test('it should return 404 on get inexisting category', done => {
    return request(app)
      .get('/categories/random')
      .expect(404, done);
  });
});
