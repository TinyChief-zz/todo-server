const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Blog app',
    message: 'You are visiting blog app.'
  })
})

module.exports = router
