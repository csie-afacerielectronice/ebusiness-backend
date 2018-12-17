const router = require('express').Router();
const addressController = require('../controllers/address.controller');

router.get('/addresses', addressController.getAddresses);

module.exports = router;
