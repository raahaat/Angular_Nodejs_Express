const express = require('express');
const bank = require('../controllers/bank-controller');
const router = express.Router();


router.get('/banklist/view', bank.getAllBank);
router.get('/bank/:id', bank.getSingleBank);
router.post('/add-bank', bank.addBank);
router.delete('/delete-bank/:id', bank.deleteBankById);
router.put('/edit-bank/:id', bank.editBankById);

module.exports = router;