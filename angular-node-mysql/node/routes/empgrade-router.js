const express = require('express');
const grade = require('../controllers/empgrade-controller');
const router = express.Router();


router.get('/grade', grade.getAllGrade);
router.get('/grade/:id', grade.getSingleGrade);
router.post('/add-grade', grade.addGrade);
router.delete('/delete-grade/:id', grade.deleteGradeById);
router.put('/edit-grade/:id', grade.editGradeById);

module.exports = router;