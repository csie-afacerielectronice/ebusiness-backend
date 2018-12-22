const db = require('../../src/models');
const clientService = require('../../src/services/client.service.js');

describe('Client service', () => {
  let userObj;
  let clientObj;
  const data = {
    name: 'Ion',
    surname: 'Ion'
  };
  beforeAll(async done => {
    userObj = await db.user.findOne({ where: { email: 'client@test.com' } });
    data.userId = userObj.id;
    clientObj = await new db.client(data).save();
    done();
  });

  test('it should get all clients', async done => {
    const result = await clientService.getClients();
    expect(result).not.toHaveLength(0);
    done();
  });
  test('it should create a new client', async done => {
    const result = await clientService.createClient(data);
    expect(result).toBeTruthy();
    done();
  });
  test('it should get a client by id', async done => {
    const result = await clientService.getClient(clientObj.id);
    expect(result).toMatchObject(data);
    done();
  });
  test('it should patch a client', async done => {
    const result = await clientService.updateClient(clientObj.id, {
      name: 'ceva2'
    });
    expect(result).toMatchObject({ ...data, name: 'ceva2' });
    done();
  });
  test('it should delete a client', async done => {
    const result = await clientService.deleteClient(clientObj.id);
    expect(result).toBeTruthy();
    done();
  });

  test('it should return null when getting an inexistent client', async done => {
    const result = await clientService.getClient(clientObj.id);
    expect(result).toBeFalsy();
    done();
  });

  test('it should return null when updating an inexistent client', async done => {
    const result = await clientService.updateClient(clientObj.id);
    expect(result).toBeFalsy();
    done();
  });

  test('it should return null when deleting an inexistent client', async done => {
    const result = await clientService.deleteClient(clientObj.id);
    expect(result).toBeFalsy();
    done();
  });
});
