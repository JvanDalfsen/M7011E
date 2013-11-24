/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./event.ts"/>

module MyCalendar.Models {
    var mongoose = require('mongoose');

    var calendarSchema = new mongoose.Schema({
        name:   String,
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
    });

    export var Calendar = mongoose.model('Calendar', calendarSchema);
}