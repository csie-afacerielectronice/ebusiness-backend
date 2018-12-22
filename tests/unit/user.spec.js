const db = require('../../src/models');
const userService = require('../../src/services/user.service.js');

describe('User service', () => {
  let userObj;
  const data = {
    email: 'anghel@test.com',
    password: '123456'
  };
  beforeAll(async () => {
    userObj = await new db.user(data).save();
    data.email = 'anghel2@test.com';
  });
  test('it should get all users', async done => {
    const result = await userService.getUsers();
    expect(result).not.toHaveLength(0);
    done();
  });
  test('it should create a new user', async done => {
    const result = await userService.createUser(data);
    expect(result).toBeTruthy();
    done();
  });
  test('it should get an user by id', async done => {
    const result = await userService.getUser(userObj.id);
    expect(result).toHaveProperty('email', 'anghel@test.com');
    done();
  });
  test('it should patch an user', async done => {
    const result = await userService.updateUser(userObj.id, {
      email: 'ceva2@ceva.com'
    });
    expect(result).toHaveProperty('email', 'ceva2@ceva.com');
    done();
  });

  test('it should return an error when patching an user', async done => {
    try {
      await userService.updateUser(userObj.id, {
        email: { test: 'test' }
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });

  test('it should delete an user', async done => {
    const result = await userService.deleteUser(userObj.id);
    expect(result).toBeTruthy();
    done();
  });

  test('it should return an error when getting an inexistent user', async done => {
    try {
      await userService.getUser(userObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });

  test('it should return an error when updating an inexistent user', async done => {
    try {
      await userService.updateUser(userObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });

  test('it should return an error when deleting an inexistent user', async done => {
    try {
      await userService.deleteUser(userObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });
});
