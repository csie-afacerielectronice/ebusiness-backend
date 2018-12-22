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
    categoryObj = await new db.category({
      name: 'category'
    }).save();
    data.categoryId = categoryObj.id;
    productObj = await new db.product({
      ...data
    }).save();
  });
  test('it should get all products', async done => {
    const result = await productService.getProducts();
    expect(result).not.toHaveLength(0);
    done();
  });
  test('it should create a new product', async done => {
    const result = await productService.createProduct(data);
    expect(result).toBeTruthy();
    done();
  });
  test('it should return an error if validation is not met on new product', async done => {
    try {
      await productService.createProduct({ name: '1' });
    } catch (e) {
      expect(e).toBeTruthy();
    }
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

  test('it should return an error when patching a product', async done => {
    try {
      await productService.updateProduct(productObj.id, {
        name: { test: 'test' }
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
    done();
  });

  test('it should delete a product', async done => {
    const result = await productService.deleteProduct(productObj.id);
    expect(result).toBeTruthy();
    done();
  });

  test('it should return an error when getting an inexistent product', async done => {
    try {
      await productService.getProduct(productObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });

  test('it should return an error when updating an inexistent product', async done => {
    try {
      await productService.updateProduct(productObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });

  test('it should return an error when deleting an inexistent product', async done => {
    try {
      await productService.deleteProduct(productObj.id);
    } catch (e) {
      expect(e).toHaveProperty('status', 404);
    }
    done();
  });
});
