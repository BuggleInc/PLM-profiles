'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Profile = mongoose.model('Profile'),
  _ = require('lodash');

exports.find = function (req, res, next) {
  var providerID = '';
  var providerKey = '';
  if (req.params && req.params.providerID && req.params.providerKey) {
    providerID = req.params.providerID;
    providerKey = req.params.providerKey;
  }
  Profile.findOne({
    loginInfo: {
      providerID: providerID,
      providerKey: providerKey
    }
  }).exec(function (err, profile) {
    req.profile = profile;
    next();
  });
};

/**
 * Create a Profile
 */
exports.create = function (req, res) {
  var profile = new Profile(req.body);
  Profile.findUniqueGitID(function (gitID) {
    profile.gitID = gitID;
    profile.fullName = profile.firstName + ' ' + profile.lastName;
    profile.save(function (err) {
      res.json({
        profile: profile
      });
    });
  });
};

/**
 * Show the current Profile
 */
exports.read = function (req, res) {
  if (req.profile) {
    res.json({
      profile: req.profile
    });
  } else {
    res.status(404).json({
      error: 'error'
    });
  }
};

/**
 * Update a Profile
 */
exports.update = function (req, res) {
  var profile = req.profile;
  if (!profile) {
    res.status(404).json();
  } else {
    // Merge existing profile
    profile = _.extend(profile, req.body);
    profile.updated = Date.now();
    profile.fullName = profile.firstName + ' ' + profile.lastName;

    profile.save(function (err) {
      if (err) {
        res.status(500).json({
          error: 'error'
        });
      } else {
        res.json({
          profile: profile
        });
      }
    });
  }
};

/**
 * Delete an Profile
 */
exports.delete = function (req, res, next) {
  if (req.profile) {
    Profile.remove(req.profile)
      .exec(function (err) {
        if (err) {
          res.status(500).json({
            error: 'error'
          });
        }
        res.status(200).json({
          error: 'error'
        });
      });
  } else {
    res.status(404).json({
      error: 'error'
    });
  }
};