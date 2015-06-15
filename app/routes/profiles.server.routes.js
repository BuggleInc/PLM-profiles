'use strict';
/**
 * Module dependencies.
 */
var profiles = require('../../app/controllers/profiles.server.controller');

module.exports = function (app) {

  app.use('/profiles/:providerID/:providerKey', profiles.find);

  // Article Routes
  app.route('/profiles')
    .post(profiles.create);

  app.route('/profiles/:providerID/:providerKey')
    .get(profiles.read)
    .put(profiles.update)
    .delete(profiles.delete);
};