const express = require('express');
const EmployeeKpiController = require('../controllers/emp-kpi-controller');

const router = express.Router();

router.post('/employee-kpi/apply', EmployeeKpiController.kpiApply);
router.get('/employee-kpi/code-master', EmployeeKpiController.getCodeMasterList);
router.get('/employee-kpi-approval/list/:id', EmployeeKpiController.getKpiAppListByID);
router.put('/employee-kpi-approval/master-data/', EmployeeKpiController.getKpiMasterDataByID);
router.put('/employee-kpi-approval/behaviour-ob-data/', EmployeeKpiController.getKpiOBBehaviourByID);
router.put('/employee-kpi-approval/behaviour-pb-data/', EmployeeKpiController.getKpiPBBehaviourByID);
router.put('/employee-kpi-approval/main-kpi-head/', EmployeeKpiController.getKpiMainHeadByID);
router.put('/employee-kpi-approval/sub-kpi-head/', EmployeeKpiController.getKpiSubHeadByID);
router.put('/employee-kpi-approval/save-evaluation-data/', EmployeeKpiController.setKpiEvaluationMarks);
router.get('/employee-kpi/kpi-year', EmployeeKpiController.getKpiYear);
router.get('/employee-kpi/kpi-data/:id', EmployeeKpiController.getKpiDataByUser);
router.get('/employee-kpi/kpi-data-edit/:id', EmployeeKpiController.getKpiDataForEdit);
router.get('/employee-kpi/duplicate-check', EmployeeKpiController.getDuplicateKPIApply);
router.delete('/employee-kpi/kpi-history/delete/:id', EmployeeKpiController.deleteKpiHistoryById);
router.put('/employee-kpi/update-kpi-data/:id', EmployeeKpiController.updateKpi);

router.get('/employee-kpi-acceptance/list/:id', EmployeeKpiController.getKpiAcceptanceListByID);
router.put('/employee-kpi-acceptance/update/', EmployeeKpiController.postKpiAcceptanceByID);


module.exports = router;
