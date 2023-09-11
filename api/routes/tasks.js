const express = require('express');
const router = express.Router();
const { GetTasks, GetOneTask, CreateTask, DeleteTask, UpdateTask } = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth);

// Get all available tasks
router.get('/', GetTasks);

// Get 1 singular task by id
router.get('/:id', GetOneTask);

// Create a task (post it to the database)
router.post('/', CreateTask);

// Delete a task (from the database)
router.delete('/:id', DeleteTask);

// Edit the attributes of an existing task
router.put('/:id', UpdateTask);


module.exports = router