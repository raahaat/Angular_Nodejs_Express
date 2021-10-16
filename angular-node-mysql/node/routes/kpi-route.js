const express = require('express');
const kpiController = require('../controllers/kpi-controller');

const router = express.Router();


router.get('/oracledata/kpi/:employeeId', kpiController.getKpi);


module.exports = router;