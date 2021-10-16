const express = require('express');
const router = express.Router();
const carModelControllr = require('../controllers/car-process-controller');

router.post('/car-process/submit', carModelControllr.submitForCarProcess);

module.exports = router;

