const ServiceHelper = require('../../../src/utils/service_helper');

const dummyModel = {
  findOne: () => ({
    id: 'test',
    update: jest.fn(() => ({
      id: 'test'
    })),
    destroy: jest.fn(() => null)
  }),
  create: jest.fn(() =>
    Promise.resolve({
      id: 'test'
    })
  ),
  findAll: jest.fn(() =>
    Promise.resolve({
      id: 'test'
    })
  )
};

const dummyService = new ServiceHelper(dummyModel);

describe('Service Helper', () => {
  test('save', async done => {
    const result = await dummyService.save({ foo: 'bar' });
    expect(result).toHaveProperty('id');
    done();
  });

  test('update', async done => {
    const result = await dummyService.update('123', { foo: 'bar' });
    expect(result).toHaveProperty('id');
    done();
  });

  test('destroy', async done => {
    const result = await dummyService.destroy('123');
    expect(result).toBeUndefined();
    done();
  });

  test('find', async done => {
    const result = await dummyService.find('123', { foo: 'bar' });
    expect(result).toHaveProperty('id');
    done();
  });

  test('get', async done => {
    const result = await dummyService.get('123', { foo: 'bar' });
    expect(result).toHaveProperty('id');
    done();
  });
});
