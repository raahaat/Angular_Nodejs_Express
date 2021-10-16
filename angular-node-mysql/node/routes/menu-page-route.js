const express = require('express');
const menuPage = require('../controllers/menu-page-controller');

const router = express.Router();


router.get('/menu-page/by-parent/:parent_code', menuPage.getMenuPageByParent);

router.get('/menu-page/list', menuPage.getMenuPageList);
router.post('/menu-page/add', menuPage.addMenuPage);
router.get('/menu-page/fetch/:id', menuPage.getMenuPageById);
router.put('/menu-page/update/:id', menuPage.updateMenuPage);
router.delete('/menu-page/delete/:id', menuPage.deleteMenuPage);



module.exports = router;