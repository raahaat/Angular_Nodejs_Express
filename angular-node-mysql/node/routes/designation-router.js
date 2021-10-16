const express = require('express');
const designation = require('../controllers/designation-cotroller');
const router = express.Router();


router.get('/designation', designation.getAllDesignation);
router.get('/designation/:id', designation.getSingleDesignation);
router.post('/add-designation', designation.addDesignation);
router.delete('/delete-designation/:id', designation.deleteDesignationById);
router.put('/edit-designation/:id', designation.editDesignationById);

module.exports = router;