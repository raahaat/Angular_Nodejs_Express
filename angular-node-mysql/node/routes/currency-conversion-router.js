const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency-conversion-controller');

router.get('/currency-conversion/view', currencyController.getCurrencyList);
router.delete('/currency-conversion/delete/:id', currencyController.deleteCurrency );
router.post('/currency-conversion/add', currencyController.addCurrency);
router.get('/currency-conversion/edit/:id', currencyController.editCurrency);
router.put('/currency-conversion/update/:id', currencyController.updateCurrency);


module.exports = router;

