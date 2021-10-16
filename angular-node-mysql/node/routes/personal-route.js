const express = require('express');
const personalController = require('../controllers/personal-controller');

const router = express.Router();


router.get('/oracledata/emplist/:pyostamp', personalController.getEmployeeList);
router.get('/oracledata/singleemp/:pyostamp', personalController.getEmployeeData);


module.exports = router;