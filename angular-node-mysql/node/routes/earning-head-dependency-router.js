const express = require('express');
const headDependency = require('../controllers/earning-head-dependency-controller');
const router = express.Router();


router.get('/head-dependency/view', headDependency.getAllHeadDependency);
router.get('/head-dependency/:id', headDependency.getSingleHeadDependency);
router.post('/add-head-dependency', headDependency.addHeadDependency);
router.delete('/delete-head-dependency/:id', headDependency.deleteHeadDependencyById);
router.put('/edit-head-dependency/:id', headDependency.editHeadDependencyById);

module.exports = router;