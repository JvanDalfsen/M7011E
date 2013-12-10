/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./calendar.ts"/>
var mongoose = require('mongoose');
var async = require('async');

var userSchema = new mongoose.Schema({
    userid: { type: String, required: 'Name is required!', index: { unique: true, dropDups: true } },
    displayName: String,
    firstname: String,
    lastname: String,
    email: String,
    avatar: String,
    lastConnection: Date,
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }]
});

/**
* TODO: Check that the calendars' id are valids.
*/
exports.User = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map
