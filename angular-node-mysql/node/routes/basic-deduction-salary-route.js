const express = require('express');
const basicDeductionController = require('../controllers/basic-deduction-salary-controller');
const router = express.Router();

router.post('/basic-deduction-process/submit-data', basicDeductionController.submitDataForBasicDeduction);

module.exports = router;
