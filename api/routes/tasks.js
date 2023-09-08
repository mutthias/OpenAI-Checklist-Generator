const express = require('express');
const router = express.Router();
const { GetTasks, GetOneTask, CreateTask, DeleteTask, UpdateTask } = require('../controllers/taskController')

router.get('/', GetTasks);
router.get('/:id', GetOneTask);
router.post('/', CreateTask);
router.delete('/:id', DeleteTask);
router.patch('/:id', UpdateTask);


module.exports = router