/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/calendar.ts"/>

import express = require('express');
import Models = require('../models/calendar');

export class Calendar {
    public static create(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        var newCalendar = Calendar.buildModelFromReq(req);

        Models.Calendar.create(newCalendar, (err: any, calendar: any): void => {
            if (err || !calendar) {
                res.send(400, err);
            } else {
                res.send(calendar);
            }
        });
    }

    public static find(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }
        req.body.owner = req.user._id;

        Models.Calendar.find(req.body, (err: any, calendars: any): void => {
            if (err) {
                res.send(400, err);
            } else {
                res.send(calendars);
            }
        });
    }

    public static findById(req: express.Request, res: express.Response, next: Function) {
        Models.Calendar.findById(req.params.id, (err: any, calendar: any): void => {
            if (err || !calendar) {
                res.send(404, err);
            } else {
                res.send(calendar);
            }
        });
    }

    public static update(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Calendar.findById(req.params.id, (err: any, calendar: any): void => {
            if (err || !calendar) {
                // If nothing found, creates it.
                Calendar.create(req, res, next);
            } else {
                var updatedCalendar = Calendar.buildModelFromReq(req);

                Models.Calendar.findByIdAndUpdate(req.params.id, updatedCalendar, (err: any, calendar: any): void => {
                    if (err || !calendar) {
                        res.send(400, err);
                        console.log(err);
                    } else {
                        res.send(calendar);
                    }
                });
            }
        });
    }

    public static delete(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Calendar.findByIdAndRemove(req.params.id, (err: any, calendar: any): void => {
            if (err || !calendar) {
                res.send(400, err);
            } else {
                res.send(calendar);
            }
        });
    }

    private static buildModelFromReq(req: express.Request): any {
        var calendar: any = {};
            
        if (req.body.name) {
            calendar.name = req.body.name;
        } 

        if (req.body.events) {
            calendar.events = req.body.events;
        }

        calendar.owner = req.user._id;

        return calendar;
    }
}
