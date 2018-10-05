const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const acl = require('../middleware/acl')
// const passport = require('passport')
// const User = require('../models/user')
// const passport = require('passport')

router.get('/', acl.authenticate, taskController.getTasks)

// To get all tasks of user
router.get('/:id', taskController.getUserTasks)

// To task a new task
router.post('/', taskController.createTask)

// Updating data of a task
router.put('/:id', taskController.updateTask)

// To delete a specific task
router.delete('/:id', taskController.deleteTask)

module.exports = router

// function requireAdmin () {
//   return async function (req, res, next) {
//     // const candidate = await User.findOne({ email: req.body.email })
//     const data = req.headers
//     res.status(200).send(data)
//   }
// }
