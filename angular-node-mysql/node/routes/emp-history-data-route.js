const express = require('express');
const router = express.Router();

const fetchGrowthData = require('../controllers/emp-history-data-controller');

// Some route are used from "other-change-emp-route" for this controller
router.get('/fetch-emp-growth/:employee_code', fetchGrowthData.fetchGrowthData);
router.get('/grow-detail-doc', fetchGrowthData.growtDetailshByDoc);
router.put('/emp-grow-details/update', fetchGrowthData.updateGrowDetails);
router.put('/emp-growth/update', fetchGrowthData.updateEmpGrowth);
router.delete('/emp-grow-details/delete/:id', fetchGrowthData.deleteGrowDetails);

module.exports = router;
