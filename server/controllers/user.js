/// <reference path="../definitions/server.d.ts"/>
var express = require('express');
var Models = require('../models/user');

var Event = (function () {
    function Event() {
    }
    Event.logout = function (req, res, next) {
        req.logout();
        res.redirect('/');
    };

    Event.currentSession = function (req, res, next) {
        if (!req.user) {
            res.send(400);
        } else {
            Models.User.findById(req.user._id, function (err, user) {
                if (err || !user) {
                    res.send(400, err);
                } else {
                    res.send(200, req.user);
                }
            });
        }
    };

    Event.failure = function (req, res, next) {
        res.send(200, 'Authentication failure!');
    };

    Event.update = function (req, res, next) {
        if (!req.user) {
            res.send(400);
        } else {
            var update = {};

            if (req.body.calendars) {
                update.calendars = req.body.calendars;
            }

            Models.User.findByIdAndUpdate(req.user._id, update, function (err, user) {
                if (err || !user) {
                    res.send(400, err);
                } else {
                    res.send(user);
                }
            });
        }
    };

    Event.delete = function (req, res, next) {
        if (!req.user) {
            res.send(400);
        } else {
            Models.User.findByIdAndRemove(req.user._id, function (err, user) {
                if (err || !user) {
                    res.send(400, err);
                } else {
                    req.logout();
                    res.redirect('/');
                }
            });
        }
    };
    return Event;
})();
exports.Event = Event;
//# sourceMappingURL=user.js.map
