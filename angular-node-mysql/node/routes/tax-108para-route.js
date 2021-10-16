const express = require('express');
const tax108paraController = require('../controllers/tax-108para-controller');

const router = express.Router();



router.get('/tax-108para/view', tax108paraController.getTax108paraList);
router.post('/tax-108para/add', tax108paraController.addTax108para);
router.get('/tax-108para/fetch/:id', tax108paraController.getTax108paraById);
router.put('/tax-108para/update/:id', tax108paraController.updateTax108para);
router.delete('/tax-108para/delete/:id', tax108paraController.deleteTax108para);
router.get('/tax-108para/deduction-code', tax108paraController.getDeductionCode);


module.exports = router;
