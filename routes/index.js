const express = require('express')
const morgan = require('morgan')
const home = require('./home')
const users = require('./users')
const auth = require('./auth')
const tasks = require('./tasks')
const passport = require('passport')
const router = express.Router()

router.use(morgan('combined'))

router.use('/', home)
router.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  users
)
router.use('/api/auth', auth)
router.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  tasks
)

module.exports = router
