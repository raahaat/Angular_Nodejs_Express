const express = require('express');
const carRegisterController = require('../controllers/car-register-controller');

const router = express.Router();

router.get('/car-register/view', carRegisterController.getCarRegisterData);
router.get('/car-register/single-entry/:id', carRegisterController.getSingleCarData);
router.delete('/car-register/delete/:id', carRegisterController.deleteCarRegister );
router.post('/car-register/add', carRegisterController.addCarRegister);
router.put('/car-register/update/:id', carRegisterController.updateCarRegister);

module.exports = router