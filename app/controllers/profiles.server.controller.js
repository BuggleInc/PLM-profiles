'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Profile = mongoose.model('Profile'),
  _ = require('lodash');


exports.find = function (providerID, providerKey, next) {
  Profile.findOne({
    providerID: providerID,
    providerKey: providerKey
  }).exec(function (err, profile) {
    next(err, profile);
  });
};

exports.profileByID = function (req, res, next) {
  var id = '';
  if (req.params && req.params.profileID) {
    id = req.params.profileID;
  }

  Profile.findOne({
    _id: id
  }).exec(function (err, profile) {
    if (err) {
      return next(err);
    }
    if (!profile) {
      return next(new Error('Failed to load Profile ' + id));
    }
    req.profile = profile;
    next();
  });
};

/**
 * Create a Profile
 */
exports.create = function (req, res) {
  var self = module.exports;
  var profile = new Profile(req.body);
  self.find(profile.providerID, profile.providerKey, function (err, existingProfile) {
    if (err) {
      res.status(500).send('Error while looking up for profile');
    }
    if (!existingProfile) {
      Profile.findUniqueGitID(function (gitID) {
        profile.gitID = gitID;
        profile.save(function (err) {
          return res.json(profile);
        });
      });
    } else {
      res.json(existingProfile);
    }
  });
};

/**
 * Show the current Profile
 */
exports.read = function (req, res) {
  res.json(req.profile);
};

/**
 * Update a Profile
 */
exports.update = function (req, res) {
  var profile = req.profile;
  // Merge existing profile
  profile = _.extend(profile, req.body);
  profile.updated = Date.now();
  profile.fullName = profile.firstName + ' ' + profile.lastName;

  profile.save(function (err) {
    if (err) {
      res.status(500).send('Error while update profile');
    } else {
      res.json(profile);
    }
  });
};

/**
 * Delete an Profile
 */
exports.delete = function (req, res, next) {
  Profile.remove(req.profile)
    .exec(function (err) {
      if (err) {
        res.status(500).send();
      }
      res.send();
    });
};