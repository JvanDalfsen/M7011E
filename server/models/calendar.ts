/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./event.ts"/>

import Models = require('./event');

var mongoose = require('mongoose');
var async = require('async');

var calendarSchema = new mongoose.Schema({
    name: { type: String, required: 'Name is required!' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' /* validate: cf below */}]
    // TODO: add an owner.
});

/**
    * Check that the events' id are valids.
    */
calendarSchema.path('events').validate((value: Array<any>, respond: (boolean) => void): void => {
    async.reduce(value, true, (memo: any, item: any, callback: AsyncSingleResultCallback<any>): void => {
        Models.Event.findById(item, (err: any, event: any): void => {
            if (err || !event) {
                callback(null, false && memo);
            }

            callback(null, true && memo);
        }, 'Invalid ObjectId for the event');
    }, (err: string, result: any): any => {
        respond(result);
    });
});

export var Calendar = mongoose.model('Calendar', calendarSchema);
