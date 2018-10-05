const { User, validate } = require('../models/user')

// Get ALL posts
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// Get ONE user
module.exports.getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    if (!result) {
      res.status(404).send('No user with that ID.')
      return
    }
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// Update data of user
module.exports.updateUser = async (req, res, next) => {
  validate(req, res)
  try {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    if (!result) {
      res.status(404).send('No user with that ID.')
      return
    }
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndRemove(req.params.id)
    if (!result) {
      res.status(404).send('No user with that ID.')
      return
    }
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}
