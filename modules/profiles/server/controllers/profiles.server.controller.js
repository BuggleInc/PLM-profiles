'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  Profile = mongoose.model('Profile'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a profile
 */
exports.create = function (req, res) {
  var profile = new Profile(req.body);

  profile.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(profile);
  });
};

/**
 * Show the current profile
 */
exports.read = function (req, res) {
  res.json(req.profile);
};

/**
 * Update a profile
 */
exports.update = function (req, res) {
  var profile = req.profile;

  // Merge existing profile
  profile = _.extend(profile, req.body);
  profile.updated = Date.now();

  Profile.findOneAndUpdate(
    { _id: profile._id },
    { $set: profile },
    function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(profile);
  });
};

/**
 * Delete an profile
 */
exports.delete = function (req, res) {
  var profile = req.profile;

  profile.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(profile);
  });
};

/**
 * List of profiles
 */
exports.list = function (req, res) {
  Profile.find().sort('-created').exec(function (err, profiles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(profiles);
  });
};

/**
 * Profile middleware
 */
exports.profileByProvider = function (req, res, next) {
  var searchQuery = {
    loginInfo: {
      providerID: req.params.providerID,
      providerKey: req.params.providerKey,
    }
  };

  Profile.findOne(searchQuery, function (err, profile) {
    if (err) {
      return next(err);
    }
    if (!profile) {
      return res.status(404).send({
        message: 'No profile with those identifiers has been found'
      });
    }
    req.profile = profile;
    next();
  });
};
