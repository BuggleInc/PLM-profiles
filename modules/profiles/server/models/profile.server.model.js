'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  uuid = require('uuid'),
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
 * Hook a pre save method to initialize gitID
 */
ProfileSchema.pre('save', function (next) {
  var self = this,
    cb;

  // Only needed on first save
  if (this.isNew) {
    // Check if gitID already exists
    // Generate a new one and retry if it does
    cb = function (err, profile) {
      if (err) {
        next(err);
      }
      if (profile) {
        // A profile with this gitID already exists, retry
        self.gitID = uuid.v4();
        self.constructor.findOne({ gitID: self.gitID }, cb);
      } else {
        next();
      }
    };

    // First try
    this.gitID = uuid.v4();
    this.constructor.findOne({ gitID: this.gitID }, cb);
  }
});

mongoose.model('Profile', ProfileSchema);
