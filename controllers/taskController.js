const { Task } = require('../models/task')
const { User } = require('../models/user')

// Get ALL tasks
module.exports.getTasks = async (req, res, err) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// Get ONE post
module.exports.getUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.params.id })
    // const sendRes = () => res.status(200).json(tasks)
    // setTimeout(sendRes, 3000)
    res.status(200).json(tasks)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// Create new task
module.exports.createTask = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.body.userId })
    if (!user) {
      res.status(404).send('Invalid user.')
      return
    }
    const task = new Task(req.body)
    const result = await task.save(task)
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// Update the task
module.exports.updateTask = async (req, res, next) => {
  try {
    const result = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    if (!result) {
      res.status(404).json('No task with that ID.')
      return
    }
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// Delete task
module.exports.deleteTask = async (req, res, next) => {
  try {
    const result = await Task.findByIdAndRemove({ _id: req.params.id })
    if (!result) {
      res.status(404).send('No task with that ID.')
      return
    }
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}
