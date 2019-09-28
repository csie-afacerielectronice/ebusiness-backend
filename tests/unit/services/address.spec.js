const db = require('../../../src/models');
const role = require('../../../src/utils/role');
const addressService = require('../../../src/services/address_service');
const userFactory = require('../../factories/user');
const addressFactory = require('../../factories/address');

describe('Address service', () => {
  let user;
  let addressObject;
  beforeEach(async done => {
    user = await userFactory.factory({ role: role.CLIENT });
    addressObject = await addressFactory.factory({ userId: user.id });
    done();
  });
  afterEach(async () => {
    await db.address.truncate();
  });

  test('it should return all addresses', async done => {
    expect(await addressService.get({ userId: user.id })).toHaveLength(1);
    done();
  });

  test('it should create a new address with the data provided', async done => {
    const data = addressFactory.data();
    const address = await addressService.save({ ...data, userId: user.id });
    expect(address).toMatchObject(data);
    done();
  });

  test('it should update an existing address with the data provided', async done => {
    const data = addressFactory.data();
    const address = await addressService.update(addressObject.id, data);
    expect(address).toMatchObject(data);
    done();
  });

  test('it should delete an address by id', async done => {
    expect(await addressService.destroy(addressObject.id)).toBeUndefined();
    done();
  });
});
