const express = require('express');
const bmaster = require('../controllers/bonus-master-controller');
const router = express.Router();


router.get('/bmaster/view', bmaster.getAllBmaster);
router.get('/bmaster/get_category', bmaster.getCategory);
router.get('/bmaster/get_earning/:id', bmaster.getEarning);
router.get('/bmaster/get_earning', bmaster.getEarningAll);
router.post('/bmaster/add', bmaster.addBonusMaster);
router.post('/bmaster/update', bmaster.updateBmaster);
router.get('/bmaster/edit/:id', bmaster.editBmaster);
router.get('/bmaster/get_bonus_serial', bmaster.getBonusSerial);
router.delete('/bmaster/delete/:id', bmaster.deleteBmaster);
// router.get('/bmaster/:id', bheldup.getSingleBheldup);
// router.post('/add-bmaster', bheldup.addBheldup);
// router.delete('/delete-bmaster/:id', bheldup.deleteBheldupById);
// router.put('/edit-bmaster/:id', bheldup.editBheldupById);

module.exports = router;