const { User, validate } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

function hashPassword (password, options) {
  const SALT_FACTOR = 8
  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  return bcrypt.hashSync(password, salt)
}

function jwtSignUser ({ email, _id }, isAdmin = false) {
  const ONE_MONTH = 60 * 60 * 24 * 30
  return jwt.sign({ email, id: _id, isAdmin }, keys.authentication.jwtSecret, {
    expiresIn: ONE_MONTH
  })
}

// Get ALL posts
module.exports.login = async (req, res) => {
  try {
    // Does user with provided email exist
    const candidate = await User.findOne({ email: req.body.email })
    console.log(req.body)
    if (!candidate) {
      res.status(404).json({
        message: 'Нет пользователя с такими данными.'
      })
    }
    // Compare provided password with one from DB
    const passwordIsRight = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )
    if (!passwordIsRight) {
      res.status(400).json({
        message: 'Проверьте правильность введеного пароля.'
      })
    }
    // If admin logins provided jwt has info about it
    if (candidate.email === keys.authentication.adminEmail) {
      res.status(200).json({
        user: candidate,
        token: `Bearer ${jwtSignUser(candidate, true)}`
      })
    }
    // Make the jsonwebtoken and send it to client
    res.status(200).json({
      user: candidate,
      token: `Bearer ${jwtSignUser(candidate)}`
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

module.exports.register = async (req, res) => {
  try {
    // Validate req.body to have email, password and name
    validate(req, res)
    // Checks if the user with provided email already exist
    const candidate = await User.findOne({ email: req.body.email })
    console.log(candidate)
    if (candidate) {
      res.status(400).json({
        message: 'Пользователь с такой электронной почтой уже зарегистрирован'
      })
    }
    // Hash provided password
    req.body.password = hashPassword(req.body.password)
    // Finally create user
    const user = new User(req.body)
    const result = await user.save(user)
    res.send(result)
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}
