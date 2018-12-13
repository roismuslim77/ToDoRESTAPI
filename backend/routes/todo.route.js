const express = require('express');
const router = express.Router();

const todo_controller = require('../controllers/todo.controller');

router.get('/', todo_controller.allget);
router.post('/new', todo_controller.create);
router.delete('/:id/del', todo_controller.delete);
router.put('/:id/up', todo_controller.update);
router.get('/:id', todo_controller.getid);

module.exports = router;