const express = require('express');
const custController = require('../controllers/aaerp-controller');

const router = express.Router();


router.post('/customer/add', custController.addCustomer);


module.exports = router;