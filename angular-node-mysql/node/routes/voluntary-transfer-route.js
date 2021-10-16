const express = require('express');
const router = express.Router();
const voluntaryTransferController = require('../controllers/voluntary-transfer-controller');

router.get('/voluntary-transfer/view', voluntaryTransferController.getVoluntaryTransferList);
router.post('/voluntary-transfer/add', voluntaryTransferController.addVoluntaryTransfer);
router.get('/voluntary-transfer/fetch/:id', voluntaryTransferController.getVoluntaryTransferById);
router.put('/voluntary-transfer/update/:id', voluntaryTransferController.updateVoluntaryTransfer);
router.delete('/voluntary-transfer/delete/:id', voluntaryTransferController.deleteVoluntaryTransfer);
router.get('/voluntary-transfer/deduction-code', voluntaryTransferController.getDeductionCode);


module.exports = router;
