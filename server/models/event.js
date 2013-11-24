var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/server.d.ts"/>
    (function (Models) {
        var mongoose = require('mongoose');

        var eventSchema = new mongoose.Schema({
            name: String,
            description: String,
            begin: Date,
            end: Date
        });

        Models.Event = mongoose.model('Event', eventSchema);
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
