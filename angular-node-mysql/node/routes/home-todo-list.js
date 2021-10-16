const express = require('express');
const toDoList = require('../controllers/home-todo-list');
const router = express.Router();

router.get('/todo-list/:id', toDoList.getToDoList);

router.get('/todo-list-date/:id', toDoList.getToDoListDate);

module.exports = router;