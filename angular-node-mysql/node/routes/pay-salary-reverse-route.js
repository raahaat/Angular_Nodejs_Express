const express = require('express');
const salaryReverseController = require('../controllers/salary-reverse-controller');

const router = express.Router();

router.get('/salary-reverse/emplist', salaryReverseController.getEmpListByParams);
router.post('/salary-reverse/submit', salaryReverseController.submitData);
router.post('/salary-reverse/save-process', salaryReverseController.saveProcess);
module.exports = router;
