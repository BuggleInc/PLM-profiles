'use strict';

/**
 * Module dependencies.
 */
var profiles = require('../controllers/profiles.server.controller');

module.exports = function (app) {
  // Profiles collection routes
  app.route('/api/profiles')
    .get(profiles.list)
    .post(profiles.create);

  // Single profile routes
  app.route('/api/profiles/:providerID/:providerKey').all(profiles.profileByProvider)
    .get(profiles.read)
    .put(profiles.update)
    .delete(profiles.delete);
};
