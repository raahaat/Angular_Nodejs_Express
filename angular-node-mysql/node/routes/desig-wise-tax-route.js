const express = require('express');
const desigTaxController = require('../controllers/desig-wise-tax-controller');
const router = express.Router();

router.post('/desig-wise-tax/add', desigTaxController.addDesigTax);
router.get('/desig-wise-tax/desig-list/:id', desigTaxController.getDesignationByParam);
router.get('/desig-wise-tax/get-desig-tax', desigTaxController.getDesignationWiseTax);
router.get('/desig-wise-tax/get-desig-tax/edit/:id', desigTaxController.getTaxInfoById);
router.delete('/desig-wise-tax/delete/:id', desigTaxController.deleteDesignationTax);
router.put('/desig-wise-tax/update/:id', desigTaxController.updateDesignationTax);

module.exports = router;
