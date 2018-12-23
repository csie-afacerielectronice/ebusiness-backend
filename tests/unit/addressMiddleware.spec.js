const db = require('../../src/models');
const addressMiddleware = require('../../src/middlewares/address.middleware');

describe('Address middleware', () => {
  let userObj;
  beforeAll(async done => {
    userObj = await db.user.findOne({ where: { email: 'client@test.com' } });
    const clientObj = await new db.client({
      name: 'ceva',
      surname: 'ceva',
      userId: userObj.id
    }).save();
    await new db.address({
      name: 'ceva',
      isPrimary: true,
      city: 'ceva',
      county: 'ceva',
      postalCode: '291312',
      lat: 22.22,
      lng: 22.22,
      clientId: clientObj.id
    }).save();
    done();
  });

  test('it should add user to req', async done => {
    const next = jest.fn();
    const req = { user: userObj };
    await addressMiddleware(req, null, next);
    expect(next).toHaveBeenCalled();
    done();
  });

  test('it should return an error if user does not exist', async done => {
    const next = jest.fn();
    const req = { user: { id: 'ceva' } };
    await addressMiddleware(req, null, next);
    expect(next).toHaveBeenCalledWith(new Error('Not Found'));
    done();
  });
});
