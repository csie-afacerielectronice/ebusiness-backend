const db = require('../../src/models');
const productService = require('../../src/services/product.service.js');

describe('Product service', () => {
  let categoryObj;
  beforeAll(async () => {
    await db.sequelize.sync();
    categoryObj = await new db.category({
      name: 'category'
    }).save();
  });
  afterAll(async done => {
    await db.product.destroy({ truncate: true });
    await db.category.destroy({ truncate: true });
    await db.sequelize.close();
    done();
  });
  test('it should create a new product', async done => {
    const data = {
      name: 'product',
      description: 'description',
      categoryId: categoryObj.id,
      price: 14.99,
      image: '/path'
    };
    const result = await productService.createProduct(data);
    expect(result).toBeTruthy();
    done();
  });
});
