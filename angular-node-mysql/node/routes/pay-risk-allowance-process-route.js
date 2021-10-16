const express = require('express');
const processController = require('../controllers/risk-allowance-process-controller');

const router = express.Router();

router.get('/risk-allowance-process/emplist', processController.getEmpListByParams);
router.post('/risk-allowance-process/submit', processController.submitData);
router.post('/risk-allowance-process/save-process', processController.saveProcess);
module.exports = router;
