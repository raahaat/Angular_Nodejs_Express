const express = require('express');
const locationController = require('../controllers/location-code-controller');

const router = express.Router();

router.get('/location/view', locationController.getLocationCodeList);
router.post('/location/add', locationController.addLocationCode);
router.delete('/location/delete/:id', locationController.deleteLocationCode);
router.get('/location/fetch/:id', locationController.getLocationCodeById);
router.put('/location/update/:id', locationController.updateLocationCode);
router.get('/location/count', locationController.countLocation);


module.exports = router;
