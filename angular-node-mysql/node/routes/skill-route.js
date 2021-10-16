const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill-controller');


router.post('/skill/add', skillController.addSkill); 
router.get('/skill/list', skillController.getSkillList);
router.get('/skill/fetch/:id', skillController.getSkillById);
router.put('/skill/update/:id', skillController.updateSkillType);
router.delete('/skill/delete/:id', skillController.deleteSkillType);

 


module.exports = router;
