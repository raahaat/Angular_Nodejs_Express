const express = require('express');
const router = express.Router();
const taxModelControllr = require('../controllers/tax-process-controller');

router.post('/tax-process/submit', taxModelControllr.submitForTaxProcess);

module.exports = router;

