const express = require('express');
const desiredController = require('../controllers/desired-loan-controller');

const router = express.Router();

router.get('/desired-loan-advance/list', desiredController.getDesiredLoanAdvance);
router.post('/desired-loan-advance/add', desiredController.addDesiredLoanAdvance);

module.exports = router;
