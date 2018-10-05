const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 100,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    maxlength: 2000
  },
  types: [String],
  people: [String],
  location: [String],
  notifications: String,
  colors: [String],
  date: {
    type: Date,
    default: Date.now
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports.Task = Task
