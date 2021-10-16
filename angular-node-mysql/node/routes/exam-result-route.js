const e = require('express');
const express = require('express');
const examResultController = require('../controllers/exam-result-controller');

const router = express.Router();



router.get('/exam-result/list', examResultController.getExamResultList);
router.post('/exam-result/add', examResultController.addExamResult);
router.get('/exam-result/fetch/:id', examResultController.getExamResultById);
router.put('/exam-result/update/:id', examResultController.updateExamResult);
router.delete('/exam-result/delete/:id', examResultController.deleteExamResult);


module.exports = router;
