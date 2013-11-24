/// <reference path="../definitions/server.d.ts"/>

module MyCalendar.Models {
    var mongoose = require('mongoose');

    var eventSchema = new mongoose.Schema({
        name:        String,
        description: String,
        begin:       Date,
        end:         Date 
    });

    export var Event = mongoose.model('Event', eventSchema);
}