const express = require('express');
const addressTypeController = require('../controllers/address-type-controller');

const router = express.Router();



router.get('/address-type/view', addressTypeController.getAddressTypeList);
router.post('/address-type/add', addressTypeController.addAddressType);
router.get('/address-type/fetch/:id', addressTypeController.getAddressTypeById);
router.put('/address-type/update/:id', addressTypeController.updateAddressType);
router.delete('/address-type/delete/:id', addressTypeController.deleteAddressType);
router.get('/address-type/count', addressTypeController.countAddressType);


module.exports = router;
