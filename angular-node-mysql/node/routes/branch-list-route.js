const express = require('express');
const branchListController = require('../controllers/branch-list-controller');

const router = express.Router();


router.get('/divisionList', branchListController.getDivisionList);
router.get('/branchList', branchListController.getBranchList);
router.get('/branch/empList/:compcode&:branch', branchListController.getBranchWiseEmpList);


module.exports = router;