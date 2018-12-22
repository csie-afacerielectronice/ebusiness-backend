const db = require('../../src/models');
const clientMiddleware = require('../../src/middlewares/client.middleware');

describe('Client middleware', () => {
  let clientObj;
  beforeAll(async done => {
    clientObj = await db.user.findOne({ where: { email: 'client@test.com' } });
    done();
  });

  test('it should add client to req', async done => {
    const next = jest.fn();
    const req = { user: clientObj };
    await clientMiddleware(req, null, next);
    expect(next).toHaveBeenCalled();
    done();
  });

  test('it should return an error if user does not exist', async done => {
    const next = jest.fn();
    const req = { user: { id: 'ceva' } };
    await clientMiddleware(req, null, next);
    expect(next).toHaveBeenCalledWith(new Error('Not Found'));
    done();
  });
});
