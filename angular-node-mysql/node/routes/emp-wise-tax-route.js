const express = require('express');
const empTaxController = require('../controllers/emp-wise-tax-controller');
const router = express.Router();

router.post('/emp-wise-tax/add', empTaxController.saveEmployeeWiseTax);
router.get('/emp-wise-tax/emp-list/:id/:branch/:desig', empTaxController.getEmployeeList);
router.get('/emp-wise-tax/get-emp-tax', empTaxController.getEmployeeWiseTax);
router.get('/emp-wise-tax/get-emp-tax/edit/:id', empTaxController.getTaxInfoById);
router.delete('/emp-wise-tax/delete/:id', empTaxController.deleteEmployeeTax);
router.put('/emp-wise-tax/update/:id', empTaxController.updatEmployeeTax);
router.get('/desig-wise-tax/desig-list/:id', empTaxController.getDesignationByParam);

module.exports = router;
