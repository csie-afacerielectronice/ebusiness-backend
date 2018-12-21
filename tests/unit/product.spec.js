const db = require('../../src/models');
const productService = require('../../src/services/product.service.js');

describe('Product service', () => {
  let categoryObj;
  let productObj;
  const data = {
    name: 'product',
    description: 'description',
    price: 14.99,
    image: '/path'
  };
  beforeAll(async () => {
    await db.sequelize.sync();
    categoryObj = await new db.category({
      name: 'category'
    }).save();
    data.categoryId = categoryObj.id;
    productObj = await new db.product({
      ...data
    }).save();
  });
  afterAll(async done => {
    await db.product.destroy({ truncate: true });
    await db.category.destroy({ truncate: true });
    await db.sequelize.close();
    done();
  });
  test('it should get all products', async done => {
    const result = await productService.getProducts();
    expect(result).toHaveLength(1);
    done();
  });
  test('it should create a new product', async done => {
    const result = await productService.createProduct(data);
    expect(result).toBeTruthy();
    done();
  });
  test('it should get a product by id', async done => {
    const result = await productService.getProduct(productObj.id);
    expect(result).toMatchObject(data);
    done();
  });
  test('it should patch a product', async done => {
    const result = await productService.updateProduct(productObj.id, {
      name: 'ceva2'
    });
    expect(result).toMatchObject({ ...data, name: 'ceva2' });
    done();
  });
  test('it should delete a product', async done => {
    const result = await productService.deleteProduct(productObj.id);
    expect(result).toBeTruthy();
    done();
  });

  test('it should return null when getting an inexistent product', async done => {
    const result = await productService.getProduct(productObj.id);
    expect(result).toBeFalsy();
    done();
  });

  test('it should return null when updating an inexistent product', async done => {
    const result = await productService.updateProduct(productObj.id);
    expect(result).toBeFalsy();
    done();
  });

  test('it should return null when deleting an inexistent product', async done => {
    const result = await productService.deleteProduct(productObj.id);
    expect(result).toBeFalsy();
    done();
  });
});