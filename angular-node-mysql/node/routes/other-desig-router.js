const express = require('express');
const oDesignation = require('../controllers/other-desig-controller');
const router = express.Router();


router.get('/other-designation', oDesignation.getAllDesignation);
router.get('/other-designation/:id', oDesignation.getSingleDesignation);
router.post('/add-other-designation', oDesignation.addDesignation);
router.delete('/delete-other-designation/:id', oDesignation.deleteDesignationById);
router.put('/edit-other-designation/:id', oDesignation.editDesignationById);

module.exports = router;