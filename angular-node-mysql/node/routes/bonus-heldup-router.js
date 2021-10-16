const express = require('express');
const bheldup = require('../controllers/bonus-heldup-controller');
const router = express.Router();


router.get('/bheldup', bheldup.getAllBheldup);
router.get('/bheldup/:id', bheldup.getSingleBheldup);
router.post('/add-bheldup', bheldup.addBheldup);
router.delete('/delete-bheldup/:id', bheldup.deleteBheldupById);
router.put('/edit-bheldup/:id', bheldup.editBheldupById);

module.exports = router;