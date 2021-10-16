const express = require('express');
const result = require('../controllers/result-controller');
const router = express.Router();


router.get('/result', result.getAllResult);
router.get('/result/:id', result.getSingleResult);
router.post('/add-result', result.addResult);
router.delete('/delete-result/:id', result.deleteResultById);
router.put('/edit-result/:id', result.editResultById);

module.exports = router;