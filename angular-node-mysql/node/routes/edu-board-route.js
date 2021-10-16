const express = require('express');
const eduBoardController = require('../controllers/edu-board-controller');

const router = express.Router();



router.get('/edu-board/list', eduBoardController.getEduBoardList);
router.post('/edu-board/add', eduBoardController.addEduBoard);
router.get('/edu-board/fetch/:id', eduBoardController.getEduBoardById);
router.put('/edu-board/update/:id', eduBoardController.updateEduBoard);
router.delete('/edu-board/delete/:id', eduBoardController.deleteEduBoard);
router.get('/edu-board/count', eduBoardController.countEduBoard);


module.exports = router;
