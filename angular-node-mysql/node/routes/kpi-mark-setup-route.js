const express = require('express');
const router = express.Router();
const kpiMarkSetupController = require('../controllers/kpi-mark-setup-controller');

router.get('/kpi-max-group-code', kpiMarkSetupController.getMaxGroupCode);
router.get('/kpi-mark-setup/details', kpiMarkSetupController.getKpiMarkDetails);
router.post('/kpi-mark-setup/add', kpiMarkSetupController.addKpiMarkSetup);
// router.get('/variable-transacton/single-transaction/:id', variableController.getSingleTransaction);
// router.delete('/variable-transacton/delete/:id', variableController.deleteVariable );
// router.put('/variable-transaction/update/:id', variableController.updateVariable);

module.exports = router