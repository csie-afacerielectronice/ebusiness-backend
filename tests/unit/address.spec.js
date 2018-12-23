const db = require('../../src/models');
const addressService = require('../../src/services/address.service.js');

describe('Client service', () => {
  let addressObj;
  let clientObj;
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
    const userObj = await db.user.findOne({
      where: { email: 'client@test.com' }
    });
    clientObj = await new db.client({
      name: 'Ion',
      surname: 'Ion',
      userId: userObj.id
    }).save();
    data.clientId = clientObj.id;
    addressObj = await new db.address({ ...data }).save();
    done();
  });

  test('it should get all addresses', async done => {
    const result = await addressService.getAddresses(clientObj.id);
    expect(result).not.toHaveLength(0);
    done();
  });
  test('it should create a new address', async done => {
    const result = await addressService.createAddress(data);
    expect(result).toBeTruthy();
    done();
  });
  test('it should get a address by id', async done => {
    const result = await addressService.getAddress(addressObj.id);
    expect(result).toMatchObject(data);
    done();
  });
  test('it should patch a address', async done => {
    const result = await addressService.updateAddress(addressObj.id, {
      name: 'ceva2'
    });
    expect(result).toMatchObject({ ...data, name: 'ceva2' });
    done();
  });
  test('it should delete a address', async done => {
    const result = await addressService.deleteAddress(addressObj.id);
    expect(result).toBeTruthy();
    done();
  });

  test('it should return an error when getting an inexistent address', async done => {
    try {
      await addressService.getAddress(addressObj.id);
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });

  test('it should return an error when updating an inexistent address', async done => {
    try {
      await addressService.updateAddress(addressObj.id);
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });

  test('it should return an error when deleting an inexistent address', async done => {
    try {
      await addressService.deleteAddress(addressObj.id);
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });
});
