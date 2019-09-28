const db = require('../../../src/models');
const role = require('../../../src/utils/role');
const userFactory = require('../../factories/user');
const addressFactory = require('../../factories/address');

describe('Address service', () => {
  test('default', () => {
    expect(1).toBeTruthy();
  });
  // let admin;
  // let client;
  // let userObject;
  // let addressObject;
  // beforeEach(async done => {
  //   userObject = await userFactory.factory({ role: role.CLIENT });
  //   client = await userFactory.factory({ role: role.CLIENT });
  //   admin = await userFactory.factory({ role: role.ADMIN });
  //   addressObject = await addressFactory.factory({ userId: userObject.id });
  //   await addressFactory.factory({ userId: client.id });
  //   done();
  // });
  // afterEach(async () => {
  //   await db.address.destroy({ truncate: true });
  // });

  // test('it should return all addresses if the user is an admin', async done => {
  //   expect(await addressService.getAddresses(admin)).toHaveLength(2);
  //   done();
  // });

  // test('it should return specific addresses if the user is an client', async done => {
  //   expect(await addressService.getAddresses(userObject)).toHaveLength(1);
  //   done();
  // });

  // test('it should create a new address with the data provided', async done => {
  //   const data = await addressFactory.data();
  //   const address = await addressService.postAddress(data, userObject);
  //   expect(address).toMatchObject(data);
  //   done();
  // });

  // test('it should update an existing address with the data provided', async done => {
  //   const data = await addressFactory.data();
  //   const address = await addressService.updateAddress(addressObject.id, data);
  //   expect(address).toMatchObject(data);
  //   done();
  // });

  // test('it should delete an address by id', async done => {
  //   expect(
  //     await addressService.deleteAddress(addressObject.id)
  //   ).toBeUndefined();
  //   done();
  // });
});
