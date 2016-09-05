'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  config = require(path.resolve('./config/config'));

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    if(username !== process.env.API_ID || password !== process.env.API_SECRET) {
      return done(null, false, {
        message: 'Invalid username or password'
      });
    } else {
      return done(null, {});
    }
  }));
};
