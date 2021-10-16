const express = require('express');
const exam = require('../controllers/exam-controller');
const router = express.Router();


router.get('/exam', exam.getAllExam);
router.get('/exam/:id', exam.getSingleExam);
router.post('/add-exam', exam.addExam);
router.delete('/delete-exam/:id', exam.deleteExamById);
router.put('/edit-exam/:id', exam.editExamById);

module.exports = router;