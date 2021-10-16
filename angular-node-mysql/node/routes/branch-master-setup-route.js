const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branch-master-controller');

router.get('/branch-master/view', branchController.getBranchMasterList);
router.delete('/branch-master/delete/:id', branchController.deleteBranch);
router.post('/branch-master/add', branchController.addBranch);
router.get('/branch-master/edit/:id', branchController.editBranch);
router.put('/branch-master/update/:id', branchController.updateBranch);

module.exports = router;

