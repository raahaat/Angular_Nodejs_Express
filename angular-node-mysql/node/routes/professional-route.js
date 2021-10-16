const express = require('express');
const professionalController = require('../controllers/professional-controller');

const router = express.Router();


router.get('/oracledata/professioanl/:employeeId', professionalController.getSalary);
router.get('/oracledata/professioanl/loan/:employeeId', professionalController.getLoan);
router.get('/oracledata/professioanl/history/:employeeId', professionalController.getHistory);
router.get('/oracledata/professioanl/experience/:employeeId', professionalController.getExperience);


module.exports = router;