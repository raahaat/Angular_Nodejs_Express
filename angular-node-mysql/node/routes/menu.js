const express = require('express');
const menuInfo = require('../controllers/menu');
const router = express.Router();

router.get('/menuTree', menuInfo.menuList);
router.post('/menutree/add', menuInfo.addMenuTree);
router.get('/menutree/module/:id', menuInfo.getMenuTreeById);
router.post('/menutree/module/edit', menuInfo.getMenuTreeEditById);
router.delete('/menutree/delete/:id', menuInfo.deleteMenuTree);

module.exports = router;