const express = require('express');
const taxRebateController = require('../controllers/tax-rebate-policy-controller');

const router = express.Router();



router.get('/tax-rebate/view', taxRebateController.getTaxRebatePolicyList);
router.post('/tax-rebate/add', taxRebateController.addTaxRebatePolicy);
router.get('/tax-rebate/fetch/:id', taxRebateController.getTaxRebatePolicyById);
router.put('/tax-rebate/update/:id', taxRebateController.updateTaxRebatePolicy);
router.delete('/tax-rebate/delete/:id', taxRebateController.deleteTaxRebatePolicy);


module.exports = router;
