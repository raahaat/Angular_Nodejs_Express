const express = require('express');
// const codeMasterController = require('../controllers/code-master-controller');
const promotionController = require('../controllers/promotion-cf-controller');
const proposeTransferController = require('../controllers/propose-transfer-controller');

const router = express.Router();


router.post('/propose-transfer/empActivelist', proposeTransferController.getActiveEmpListByParams);

router.get('/emplist', promotionController.getEmployeeList);
router.get('/department-list', proposeTransferController.getDepartment);
router.post('/propose-transfer/process/submit', proposeTransferController.proposedTransferProcess);
router.get('/division-list', promotionController.getDivision);
router.get('/designation-list', promotionController.getDesignation);
router.get('/branch-list', promotionController.getBranch);

router.post('/propose-transfer/final-propose/submit', proposeTransferController.addProposeTransfer);
router.get('/propose-approve/approved', proposeTransferController.getProposeApproval);
router.put('/propose-approve/update-approved/:id', proposeTransferController.updateProposedApproval);


module.exports = router;