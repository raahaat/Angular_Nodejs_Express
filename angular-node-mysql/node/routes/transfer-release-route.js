const express = require('express');
const transferOrderController = require('../controllers/transfer-order-controller');

const router = express.Router();



router.get('/transfer-release/view', transferOrderController.getTransferReleaseList);
// router.post('/transfer-release/add', transferOrderController.addTransferOrder);
router.get('/transfer-release/fetch/:id', transferOrderController.getTransferOrderById);
router.put('/transfer-release/update/:id', transferOrderController.updateTransferRelease);
router.delete('/transfer-release/delete/:id', transferOrderController.deleteTransferOrder);
router.get('/transfer-release/deduction-code', transferOrderController.getDeductionCode);


module.exports = router;
