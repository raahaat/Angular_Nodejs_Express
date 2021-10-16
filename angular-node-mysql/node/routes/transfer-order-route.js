const express = require('express');
const transferOrderController = require('../controllers/transfer-order-controller');

const router = express.Router();



router.get('/transfer-order/view', transferOrderController.getTransferOrderList);
router.post('/transfer-order/add', transferOrderController.addTransferOrder);
router.get('/transfer-order/fetch/:id', transferOrderController.getTransferOrderById);
router.put('/transfer-order/update/:id', transferOrderController.updateTransferOrder);
router.delete('/transfer-order/delete/:id', transferOrderController.deleteTransferOrder);
router.get('/transfer-order/deduction-code', transferOrderController.getDeductionCode);
router.get('/employee/getEmpById/:id',transferOrderController.getEmpListById);
router.get('/employee/getEmpRelease/:id',transferOrderController.getEmpReleaseList);


module.exports = router;
