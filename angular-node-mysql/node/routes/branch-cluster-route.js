const express = require('express');
const branchClusterController = require('../controllers/branch-cluster-controller');

const router = express.Router();



router.post('/branch-cluster/add', branchClusterController.addBranchCluster);
router.get('/branch-cluster/branch-list', branchClusterController.getBranchList);


module.exports = router;
