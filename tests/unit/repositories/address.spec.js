const db = require('../../../src/models');
const userFactory = require('../../factories/user');
const addressFactory = require('../../factories/address');
const addressRepository = require('../../../src/repositories/address.repository');

describe('Address repository', () => {
  let userObject;
  let addressObject;
  beforeEach(async done => {
    userObject = await userFactory.factory();
    addressObject = await addressFactory.factory({ userId: userObject.id });
    done();
  });
  afterEach(async () => {
    await db.address.destroy({ truncate: true });
  });

  test('it should return all addresses', async done => {
    expect(await addressRepository.getAddresses()).toHaveLength(1);
    done();
  });

  test('it should return an address by id', async done => {
    const address = await addressRepository.getAddress(addressObject.id);
    expect(address).toBeTruthy();
    done();
  });

  test('it should return all addresses by user id', async done => {
    expect(
      await addressRepository.getAddressesByUserId(userObject.id)
    ).toHaveLength(1);
    done();
  });

  test('it should create a new address with the data provided', async done => {
    const data = await addressFactory.data({ userId: userObject.id });
    const address = await addressRepository.createAddress(data);
    expect(address).toMatchObject(data);
    done();
  });

  test('it should update an existing address with the data provided', async done => {
    const data = await addressFactory.data();
    const address = await addressRepository.updateAddress(
      addressObject.id,
      data
    );
    expect(address).toMatchObject(data);
    done();
  });

  test('it should delete an address by id', async done => {
    expect(
      await addressRepository.deleteAddress(addressObject.id)
    ).toBeUndefined();
    done();
  });

  test('it should throw an error if an address does not exist on get', async done => {
    await expect(addressRepository.getAddress('saf')).rejects.toThrow(
      'Not Found'
    );
    done();
  });

  test('it should throw an error if an address does not exist on update', async done => {
    const data = await addressFactory.data({ userId: userObject.id });
    await expect(addressRepository.updateAddress('saf', data)).rejects.toThrow(
      'Not Found'
    );
    done();
  });

  test('it should throw an error if an address does not exist on delete', async done => {
    await expect(addressRepository.deleteAddress('saf')).rejects.toThrow(
      'Not Found'
    );
    done();
  });
});
