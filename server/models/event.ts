/// <reference path="../definitions/server.d.ts"/>

module MyCalendar.Models {
    var mongoose = require('mongoose');

    var eventSchema = new mongoose.Schema({
        name:        String,
        description: String,
        begin:       Date,
        end:         Date
        // TODO: add an events.
        // TODO: Ensure that this event is linked to at least one calendar otherwise destroy it.  
    });

    export var Event = mongoose.model('Event', eventSchema);
}