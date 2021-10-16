const express = require('express');
const kpiLevelWiseController = require('../controllers/kpi-level-wise-mark-controller');

const router = express.Router();

router.post('/kpi-academic-qualification/add', kpiLevelWiseController.addAcademicQualification);
router.post('/kpi-professional-qualification/add', kpiLevelWiseController.addProfessionalQualification);
router.post('/kpi-experience/add', kpiLevelWiseController.addExperienceQualification);
router.post('/kpi-academic-qualification/duplicate-check', kpiLevelWiseController.checkAcademiDuplicate);
router.post('/kpi-professional-qualification/duplicate-check', kpiLevelWiseController.checkProfessionalDuplicate);
router.post('/kpi-experience/duplicate-check', kpiLevelWiseController.checkExperienceDuplicate);
router.post('/kpi-level-mark-update/duplicate-check', kpiLevelWiseController.checkDuplicateForUpdate);
router.get('/kpi-level-wise-mark/data', kpiLevelWiseController.getKpiLevelWiseData);
router.get('/kpi-get-level-data/edit', kpiLevelWiseController.getKpiDataForUpdate);
router.delete('/kpi-academic-qualification/delete/:id', kpiLevelWiseController.deleteKpiAcademic);
router.delete('/kpi-professional-qualification/delete/:id', kpiLevelWiseController.deleteKpiProfessional);
router.delete('/kpi-experience/delete/:id', kpiLevelWiseController.deleteKpiExperience);
router.put('/kpi-level-mark/update/:id', kpiLevelWiseController.updateKpiLevelMark);

module.exports = router