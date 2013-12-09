/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./event.ts"/>
var Models = require('./event');

var mongoose = require('mongoose');
var async = require('async');

var calendarSchema = new mongoose.Schema({
    name: { type: String, required: 'Name is required!' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' /* validate: cf below */  }]
});

/**
* Check that the events' id are valids.
*/
calendarSchema.path('events').validate(function (value, respond) {
    async.reduce(value, true, function (memo, item, callback) {
        Models.Event.findById(item, function (err, event) {
            if (err || !event) {
                callback(null, false && memo);
            }

            callback(null, true && memo);
        }, 'Invalid ObjectId for the event');
    }, function (err, result) {
        respond(result);
    });
});

exports.Calendar = mongoose.model('Calendar', calendarSchema);
//# sourceMappingURL=calendar.js.map
