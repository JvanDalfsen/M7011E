var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/server.d.ts"/>
    /// <reference path="../models/calendar.ts"/>
    (function (Controllers) {
        var Calendar = (function () {
            function Calendar() {
            }
            Calendar.create = function (req, res, next) {
                console.log('yo');

                // Note: passing the body only works because of the validation feature.
                // Note: we delete the ids in order to force Mongoose to generate it by itself (and also to avoid stupid hackers messing up with the db...).
                delete req.body._id;
                delete req.body.id;

                MyCalendar.Models.Calendar.create(req.body, function (err, calendar) {
                    if (err || !calendar) {
                        res.send(400, err);
                    } else {
                        res.send(calendar);
                    }
                });
            };

            Calendar.find = function (req, res, next) {
                MyCalendar.Models.Calendar.find(req.body, function (err, calendars) {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.send(calendars);
                    }
                });
            };

            Calendar.findById = function (req, res, next) {
                MyCalendar.Models.Calendar.findById(req.params.id, function (err, calendar) {
                    if (err || !calendar) {
                        res.send(404, err);
                    } else {
                        res.send(calendar);
                    }
                });
            };

            Calendar.update = function (req, res, next) {
                delete req.body._id;
                delete req.body.id;
                console.log(req.params.id);
                console.log(req.body);

                MyCalendar.Models.Calendar.findById(req.params.id, function (err, calendar) {
                    if (err || !calendar) {
                        // If nothing found, creates it.
                        Calendar.create(req, res, next);
                    } else {
                        MyCalendar.Models.Calendar.findByIdAndUpdate(req.params.id, req.body, function (err, calendar) {
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
                MyCalendar.Models.Calendar.findOneAndRemove(req.params.id, function (err, calendar) {
                    if (err || !calendar) {
                        res.send(400, err);
                    } else {
                        res.send(calendar);
                    }
                });
            };
            return Calendar;
        })();
        Controllers.Calendar = Calendar;
    })(MyCalendar.Controllers || (MyCalendar.Controllers = {}));
    var Controllers = MyCalendar.Controllers;
})(MyCalendar || (MyCalendar = {}));
