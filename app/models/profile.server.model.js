'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  utils = require('../utils/uuid.server.utils'),
  Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  userID: {
    type: String,
    trim: true
  },
  loginInfo: {
    providerID: {
      type: String,
      trim: true
    },
    providerKey: {
      type: String,
      trim: true
    }
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  lastProgLang: {
    type: String,
    trim: true
  },
  preferredLang: {
    code: {
      type: String,
      trim: true
    }
  },
  avatarURL: {
    type: String,
    trim: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  gitID: {
    type: String,
    trim: true
  },
  trackUser: {
    type: Boolean
  }
});

/**
 * Find possible not used gitID
 */
ProfileSchema.statics.findUniqueGitID = function (callback) {
  var _this = this;
  var gitID = utils.guid();

  _this.findOne({
    gitID: gitID
  }, function (err, profile) {
    if (!err) {
      if (!profile) {
        callback(gitID);
      } else {
        return _this.findUniqueGitID(callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('Profile', ProfileSchema);
