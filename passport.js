const passport = require('passport')
const { Strategy } = require('passport-discord')
const { clientID, clientSecret, callbackURL} = require('./config.json')
passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((obj, done) => done(null, obj))


passport.use(new Strategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL + "/login",
  scope: ["identify"]
}, (accestoken, refreshtoken, profile, cb) => {
  process.nextTick(() => {
    return cb(null, profile)
  })
}))

module.exports = passport
