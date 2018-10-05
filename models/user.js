const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  registered: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true
  },
  tasks: [String],
  phone: String
})

const User = mongoose.model('User', userSchema)

function validateRequest (req, res) {
  const schema = {
    email: Joi.string().email(),
    name: Joi.string().min(3).max(30),
    password: Joi.string(),
    phone: Joi.string().max(15)
  }
  const result = Joi.validate(req.body, schema)
  if (result.error) {
    res.status(400).send('Validation error: ' + result.error.details[0].message)
  }
}

module.exports.User = User
module.exports.validate = validateRequest
module.exports.userSchema = userSchema
