const express = require('express');
const router = express.Router();
const recruitController = require('../controllers/recruitment-policy-controller');

router.get('/vacancy-type/list', recruitController.getVacancyList);
router.get('/education/list', recruitController.getEducationList);
router.post('/policy/add', recruitController.addPolicyList);
router.get('/policy/list', recruitController.viewPolicyList);
router.get('/mulInstitute/list', recruitController.getInstituteData);
router.get('/desig/list', recruitController.getDesignationData);
router.get('/subject/list', recruitController.getSujectData);

module.exports = router;
