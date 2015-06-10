'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Profile = mongoose.model('Profile'),
  _ = require('lodash');


export.find = function (providerID, providerKey, done) {
  Profile.findOne({
    providerID: providerID,
    providerKey: providerKey
  }).exec(function (err, profile) {
    next(err, profile);
  });
};

exports.profileByID = function (id, next) {
  Profile.findOne({
    _id: id
  }).exec(function (err, profile) {
    next(err, profile);
  });
};

/**
 * Create a Profile
 */
exports.create = function (req, res) {
  var profile = new Profile(req.body);
  this.find(profile.providerID, profile.providerKey, function (err, existingProfile) {
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

};

/**
 * Update a Profile
 */
exports.update = function (req, res) {

};

/**
 * Delete an Profile
 */
exports.delete = function (req, res) {

};