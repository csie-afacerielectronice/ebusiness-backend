const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post('/products', productController.postProduct);
router.patch('/products/:id', productController.patchProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
