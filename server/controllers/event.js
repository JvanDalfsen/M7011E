/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/event.ts"/>
var express = require('express');
var Models = require('../models/event');

var Event = (function () {
    function Event() {
    }
    Event.create = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        var newEvent = Event.buildModelFromReq(req);

        Models.Event.create(newEvent, function (err, event) {
            if (err || !event) {
                res.send(400, err);
            } else {
                res.send(event);
            }
        });
    };

    Event.find = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }
        req.body.owner = req.user._id;

        Models.Event.find(req.body, function (err, events) {
            if (err) {
                res.send(400, err);
            } else {
                res.send(events);
            }
        });
    };

    Event.findById = function (req, res, next) {
        Models.Event.findById(req.params.id, function (err, event) {
            if (err || !event) {
                res.send(404, err);
            } else {
                res.send(event);
            }
        });
    };

    Event.update = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Event.findById(req.params.id, function (err, event) {
            if (err || !event) {
                Event.create(req, res, next);
            } else {
                var updatedEvent = Event.buildModelFromReq(req);

                Models.Event.findByIdAndUpdate(req.params.id, updatedEvent, function (err, event) {
                    if (err || !event) {
                        res.send(400, err);
                    } else {
                        res.send(event);
                    }
                });
            }
        });
    };

    Event.delete = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Event.findByIdAndRemove(req.params.id, function (err, event) {
            if (err) {
                res.send(400, err);
            } else {
                res.send(event);
            }
        });
    };

    Event.buildModelFromReq = function (req) {
        var event = {};

        if (req.body.name) {
            event.name = req.body.name;
        }

        if (req.body.description) {
            event.description = req.body.description;
        }

        if (req.body.location) {
            event.location = req.body.location;
        }

        if (req.body.begin) {
            event.begin = req.body.begin;
        }

        if (req.body.end) {
            event.end = req.body.end;
        }

        if (req.body.documents) {
            if (req.body.documents == 'empty') {
                event.documents = [];
            } else {
                event.documents = req.body.documents;
            }
        }

        event.owner = req.user._id;

        return event;
    };
    return Event;
})();
exports.Event = Event;
//# sourceMappingURL=event.js.map
