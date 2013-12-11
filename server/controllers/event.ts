/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/event.ts"/>

import express = require('express');
import Models = require('../models/event');


export class Event {
    public static create(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }


        var newEvent = Event.buildModelFromReq(req);

        Models.Event.create(newEvent, (err: any, event: any): void => {
            if (err || !event) {
                res.send(400, err);
            } else {
                res.send(event);
            }
        });
    }

    public static find(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }
        req.body.owner = req.user._id;

        Models.Event.find(req.body, (err: any, events: any): void => {
            if (err) {
                res.send(400, err);
            } else {
                res.send(events);
            }
        });
    }

    public static findById(req: express.Request, res: express.Response, next: Function) {
        Models.Event.findById(req.params.id, (err: any, event: any): void => {
            if (err || !event) {
                res.send(404, err);
            } else {
                res.send(event);
            }
        });
    }

    public static update(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Event.findById(req.params.id, (err: any, event: any): void => {
            if (err || !event) {
                Event.create(req, res, next);
            } else {
                var updatedEvent = Event.buildModelFromReq(req);

                Models.Event.findByIdAndUpdate(req.params.id, updatedEvent, (err: any, event: any): void => {
                    if (err || !event) {
                        res.send(400, err);
                    } else {
                        res.send(event);
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

        Models.Event.findByIdAndRemove(req.params.id, (err: any, event: any): void => {
            if (err) {
                res.send(400, err);
            } else {
                res.send(event);
            }
        });
    }

    private static buildModelFromReq(req: express.Request): any {
        var event: any = {};

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
            event.documents = req.body.documents;
        }

        event.owner = req.user._id;

        return event;
    }
}
