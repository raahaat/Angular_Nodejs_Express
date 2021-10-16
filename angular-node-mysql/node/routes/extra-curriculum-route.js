const express = require('express');
const extraCurriculum = require('../controllers/extra-curriculum-controller');

const router = express.Router();

router.get('/extra-curriculum/view', extraCurriculum.getExtraCurriculumList);
router.post('/extra-curriculum/add', extraCurriculum.addExtraCurriculum);
router.delete('/extra-curriculum/delete/:id', extraCurriculum.deleteExtraCurriculum);
router.get('/extra-curriculum/fetch/:id', extraCurriculum.getExtraCurriculumById);
router.put('/extra-curriculum/update/:id', extraCurriculum.updateExtraCurriculum);
router.get('/extra-curriculum/count', extraCurriculum.countExtCurriculum);


module.exports = router;
