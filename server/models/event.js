/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./document.ts"/>
var Models = require('./document');

var mongoose = require('mongoose');
var async = require('async');

var eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
    begin: { type: Date, required: true },
    end: { type: Date, required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' /* validate: cf below */  }]
});

function checkDate(next) {
    if (this.begin < this.end) {
        next();
    }

    var error = new mongoose.Error.ValidationError(this);
    error['date'] = 'The begin\'s date should be before the end\'s date';

    next(error);
}

eventSchema.pre('save', checkDate);

/**
* Check that the documents' id are valids.
*/
eventSchema.path('documents').validate(function (value, respond) {
    async.reduce(value, true, function (memo, item, callback) {
        Models.Document.findById(item, function (err, document) {
            if (err || !document) {
                callback(null, false && memo);
            }

            callback(null, true && memo);
        }, 'Invalid ObjectId for the document');
    }, function (err, result) {
        respond(result);
    });
});

exports.Event = mongoose.model('Event', eventSchema);
//# sourceMappingURL=event.js.map
