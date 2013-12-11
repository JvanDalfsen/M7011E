/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./calendar.ts"/>

import Models = require('./calendar');

var mongoose = require('mongoose');
var async = require('async');

var emailSchema = new mongoose.Schema({
    value: String,
    type: String
});

var userSchema = new mongoose.Schema({
    userid: { type: String, required: 'Name is required!', index: { unique: true, dropDups: true } },
    displayName: String,
    firstname: String,
    lastname: String,
    emails: [emailSchema],
    avatars: [String],
    lastConnection: Date,
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }]
});

  /**
   * TODO: Check that the calendars' id are valids.
   */


export var User = mongoose.model('User', userSchema);
