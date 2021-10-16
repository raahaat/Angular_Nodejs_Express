const express = require('express');
const taxMasterController = require('../controllers/tax-master-controller');

const router = express.Router();



router.get('/tax-master/view', taxMasterController.getTaxMasterList);
router.post('/tax-master/add', taxMasterController.addTaxMaster);
router.get('/tax-master/fetch/:id', taxMasterController.getTaxMasterById);
router.put('/tax-master/update/:id', taxMasterController.updateTaxMaster);
router.delete('/tax-master/delete/:id', taxMasterController.deleteTaxMaster);
router.get('/tax-master/deduction-code', taxMasterController.getDeductionCode);


module.exports = router;
