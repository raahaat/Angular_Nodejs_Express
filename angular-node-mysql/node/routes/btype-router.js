const express = require('express');
const btype = require('../controllers/bonustype-controller');
const router = express.Router();


router.get('/bonustype/view', btype.getBonusTypeAll);
router.get('/btype/:id', btype.getSingleBtype);
router.post('/add-btype', btype.addBtype);
router.delete('/delete-btype/:id', btype.deleteBtypeById);
router.put('/edit-btype/:id', btype.editBtypeById);

module.exports = router;