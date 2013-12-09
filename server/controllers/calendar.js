/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/calendar.ts"/>
var express = require('express');
var Models = require('../models/calendar');

var Calendar = (function () {
    function Calendar() {
    }
    Calendar.create = function (req, res, next) {
        var newCalendar = Calendar.buildModelFromReq(req);

        Models.Calendar.create(newCalendar, function (err, calendar) {
            if (err || !calendar) {
                res.send(400, err);
            } else {
                res.send(calendar);
            }
        });
    };

    Calendar.find = function (req, res, next) {
        Models.Calendar.find(req.body, function (err, calendars) {
            if (err) {
                res.send(400, err);
            } else {
                res.send(calendars);
            }
        });
    };

    Calendar.findById = function (req, res, next) {
        Models.Calendar.findById(req.params.id, function (err, calendar) {
            if (err || !calendar) {
                res.send(404, err);
            } else {
                res.send(calendar);
            }
        });
    };

    Calendar.update = function (req, res, next) {
        Models.Calendar.findById(req.params.id, function (err, calendar) {
            if (err || !calendar) {
                // If nothing found, creates it.
                Calendar.create(req, res, next);
            } else {
                var updatedCalendar = Calendar.buildModelFromReq(req);

                Models.Calendar.findByIdAndUpdate(req.params.id, updatedCalendar, function (err, calendar) {
                    if (err || !calendar) {
                        res.send(400, err);
                        console.log(err);
                    } else {
                        res.send(calendar);
                    }
                });
            }
        });
    };

    Calendar.delete = function (req, res, next) {
        Models.Calendar.findByIdAndRemove(req.params.id, function (err, calendar) {
            if (err || !calendar) {
                res.send(400, err);
            } else {
                res.send(calendar);
            }
        });
    };

    Calendar.buildModelFromReq = function (req) {
        var calendar = {};

        if (req.body.name) {
            calendar.name = req.body.name;
        }

        if (req.body.events) {
            calendar.events = req.body.events;
        }

        return calendar;
    };
    return Calendar;
})();
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map
