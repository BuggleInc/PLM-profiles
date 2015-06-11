'use strict';
/**
 * Module dependencies.
 */
var profiles = require('../../app/controllers/profiles.server.controller');

module.exports = function (app) {
  // Article Routes
  app.route('/profiles')
    .post(profiles.create);

  app.route('/profiles/:profileID')
    .get(profiles.read)
    .put(profiles.update)
    .delete(profiles.delete);

  // Finish by binding the article middleware
  app.param('profileID', profiles.profileByID);
};