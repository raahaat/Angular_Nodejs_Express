const express = require('express');
const router = express.Router();

const customerSignUp = require('../controllers/customer_signup');

router.post('/signup/add', customerSignUp.addCustomer);
router.get('/signup/get', customerSignUp.getCustomers);
router.delete('/signup/delete/:id', customerSignUp.deleteCustomer);
router.get('/signup/fatch/:id', customerSignUp.getCustomerById);
router.put('/signup/update/:id', customerSignUp.updateCustomer);


module.exports = router;