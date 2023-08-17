const router = require('express').Router();
const auth = require('../auth/auth');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controller/tasks')

// CREATING A TASK
router.post('/tasks',auth, createTask)

// GETTING ALL TASK
router.get('/tasks', auth, getTasks)

// GETTING A TASK BY ID
router.get('/tasks/:id',auth,getTask);

// UPDATING A TASK
router.patch('/tasks/:id', auth,updateTask)

// DELETING A TASK
router.delete('/tasks/:id', auth,deleteTask)

// GET /tasks?completed=true

module.exports = router
