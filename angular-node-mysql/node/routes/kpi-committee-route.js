const express = require('express');
const router = express.Router();
const kpiCommitteeController = require('../controllers/kpi-committee-controller');

router.get('/kpi-committee-mark/get-kpi-data', kpiCommitteeController.getKpiData);
router.put('/kpi-committee-mark/update-kpi-mark', kpiCommitteeController.updateKpiCommittee);

module.exports = router;
