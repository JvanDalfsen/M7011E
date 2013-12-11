/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./document.ts"/>

import Models = require('./document');

var mongoose = require('mongoose');
var async    = require('async');

var eventSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    description: String,
    location:    String,
    begin:       { type: Date, required: true },
    end:         { type: Date, required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' /* validate: cf below */}],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

function checkDate(next: (err?: string) => void) {
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
eventSchema.path('documents').validate((value: Array<any>, respond: (boolean) => void): void => {
    async.reduce(value, true, (memo: any, item: any, callback: AsyncSingleResultCallback<any>): void => {
        Models.Document.findById(item, (err: any, document: any): void => {
            if (err || !document) {
                callback(null, false && memo);
            }

            callback(null, true && memo);
        }, 'Invalid ObjectId for the document');
    }, (err: string, result: any): any => {
        respond(result);
    });
});

export var Event = mongoose.model('Event', eventSchema);
