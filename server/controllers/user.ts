/// <reference path="../definitions/server.d.ts"/>

import express = require('express');
import Models = require('../models/user');

export class Event {
    public static logout(req: express.Request, res: express.Response, next: Function): void {
        (<any>req).logout();
        res.redirect('/');
    }

    public static currentSession(req: express.Request, res: express.Response, next: Function): void {
        if (!req.user) {
            res.send(400);
        } else {
            Models.User.findById(req.user._id, (err: any, user: any): void => {
                if (err || !user) {
                    res.send(400, err);
                } else {
                    res.send(200, user);
                }
            });
        }
    }

    public static failure(req: express.Request, res: express.Response, next: Function): void {
        res.send(200, 'Authentication failure!');
    }

    public static update(req: express.Request, res: express.Response, next: Function): void {
        if (!req.user) {
            res.send(400);
        } else {

            var update: any = {};

            if (req.body.calendars) {
                update.calendars = req.body.calendars;
            }

            Models.User.findByIdAndUpdate(req.user._id, update, (err: any, user: any): void => {
                if (err || !user) {
                    res.send(400, err);
                } else {
                    res.send(user);
                }
            });
        }
    }

    public static delete(req: express.Request, res: express.Response, next: Function): void {
        if (!req.user) {
            res.send(400);
        } else {
            Models.User.findByIdAndRemove(req.user._id, (err: any, user: any): void => {
                if (err || !user) {
                    res.send(400, err);
                } else {
                    (<any>req).logout();
                    res.redirect('/');
                }
            });
        }
    }
}