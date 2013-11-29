var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/server.d.ts"/>
    /// <reference path="../models/event.ts"/>
    (function (Controllers) {
        var Event = (function () {
            function Event() {
            }
            Event.create = function (req, res, next) {
                delete req.body._id;
                delete req.body.id;

                Models.Event.create(req.body, function (err, event) {
                    if (err || !event) {
                        res.send(400, err);
                    } else {
                        res.send(event);
                    }
                });
            };

            Event.find = function (req, res, next) {
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
                MyCalendar.Models.Event.findById(req.params.id, function (err, event) {
                    if (err || !event) {
                        Event.create(req, res, next);
                    } else {
                        Models.Event.findByIdAndUpdate(req.params.id, req.body, function (err, event) {
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
                Models.Event.findOneAndRemove(req.params.id, function (err, event) {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.send(event);
                    }
                });
            };
            return Event;
        })();
        Controllers.Event = Event;
    })(MyCalendar.Controllers || (MyCalendar.Controllers = {}));
    var Controllers = MyCalendar.Controllers;
})(MyCalendar || (MyCalendar = {}));
