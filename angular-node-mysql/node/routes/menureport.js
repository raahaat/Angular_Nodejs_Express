const express = require('express');
const menuReportInfo = require('../controllers/menureport');
const router = express.Router();

router.get('/menu-report-module/list', menuReportInfo.getMenuReportList);
// router.post('/menu-report/add', menuReportInfo.addMenuItem);
router.get('/menu-report-module/all/:id', menuReportInfo.getMenuReportAll);
// router.delete('/menu-report/delete/:id', menuReportInfo.deleteMenuItem);
// router.put('/menu-report/update/:id', menuReportInfo.updateCompanyList);
// router.get('/menu-report/all', menuReportInfo.getMenuItemAll);

router.get('/report-params/list', menuReportInfo.getReportParamList);
router.post('/report-params/add', menuReportInfo.addReportParams);
router.get('/report-params/edit/:id', menuReportInfo.getReportInfoById);

module.exports = router;