const db = require('../../src/models');
const adminMiddleware = require('../../src/middlewares/admin.middleware');

describe('Admin middleware', () => {
  let clientObj;
  let adminObj;
  beforeAll(async done => {
    clientObj = await db.user.findOne({ where: { email: 'client@test.com' } });
    adminObj = await db.user.findOne({ where: { email: 'admin@test.com' } });
    done();
  });

  test('it should add admin to req', async done => {
    const next = jest.fn();
    const req = { user: adminObj };
    await adminMiddleware(req, null, next);
    expect(next).toHaveBeenCalled();
    done();
  });

  test('it should return an error if user does not exist', async done => {
    const next = jest.fn();
    const req = { user: { id: 'ceva' } };
    await adminMiddleware(req, null, next);
    expect(next).toHaveBeenCalledWith(new Error('Not Found'));
    done();
  });

  test('it should return an error if user is not an admin', async done => {
    const next = jest.fn();
    const req = { user: clientObj };
    await adminMiddleware(req, null, next);
    expect(next).toHaveBeenCalledWith(new Error('Forbidden'));
    done();
  });
});
