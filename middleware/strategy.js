const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { User } = require('../models/user')
const keys = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.authentication.jwtSecret
}

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id)
    if (user) {
      user.isAdmin = payload.isAdmin
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = strategy

// module.exports = passport => {
//   passport.use(
//   )
// }
