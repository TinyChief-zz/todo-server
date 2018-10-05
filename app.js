const debug = require('debug')('app:startup')
const config = require('config')
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const router = require('./routes')
const mongoose = require('mongoose')
const app = express()

// app.use(require('cors'))
app.set('view engine', 'pug')
app.set('views', './views')

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0-jwjm5.mongodb.net/test?retryWrites=true'
  )
  .then(() => {
    // mongoose.connection.db.dropDatabase()
    // console.log('DB was dropped')
    console.log('Connected to MongoDB...')
  })
  .catch(err => console.log(err))

// Say passport to use JWT strategy
passport.use(require('./middleware/strategy'))

app.use(cors())
app.use(express.json())
app.use(router)

// Configuration
debug(`App is started in ${process.env.NODE_ENV} mode.`)
debug('Application name: ' + config.get('appname'))

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('combined'))
// }

const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`Listening on port ${port}...`)
})
