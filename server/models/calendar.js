var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/server.d.ts"/>
    /// <reference path="./event.ts"/>
    (function (Models) {
        var mongoose = require('mongoose');

        var calendarSchema = new mongoose.Schema({
            name: String,
            events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
        });

        Models.Calendar = mongoose.model('Calendar', calendarSchema);
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
