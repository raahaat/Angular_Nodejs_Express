const express = require('express');
const taxReferenceController = require('../controllers/tax-ref-entry-controller');
const router = express.Router();

router.post('/tax-ref-entry/add', taxReferenceController.saveTaxReferenceEntry);
router.get('/tax-ref-entry/get-tax-ref', taxReferenceController.getTaxRefInfo);
router.get('/tax-ref-entry/duplicate-year/:year', taxReferenceController.duplicateYearCheck);  
router.get('/tax-ref-entry/get-tax-ref/edit/:id', taxReferenceController.getTaxInfoById);
router.delete('/tax-ref-entry/delete/:id', taxReferenceController.deleteTaxRef);
router.put('/tax-ref-entry/update/:id', taxReferenceController.updateTaxRefEntry);
// router.get('/desig-wise-tax/desig-list/:id', empTaxController.getDesignationByParam);

module.exports = router;
