/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/event.ts"/>

module MyCalendar.Controllers {
    export class Event {
        public static create(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            var newEvent = Event.buildModelFromReq(req);

            Models.Event.create(newEvent, (err: any, event: any): void => {
                if (err || !event) {
                    res.send(400, err);
                } else {
                    res.send(event);
                }
            });
        }

        public static find(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Event.find(req.body, (err: any, events: any): void => {
                if (err) {
                    res.send(400, err);
                } else {
                    res.send(events);
                }
            });
        }

        public static findById(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Event.findById(req.params.id, (err: any, event: any): void => {
                if (err || !event) {
                    res.send(404, err);
                } else {
                    res.send(event);
                }
            });
        }

        public static update(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
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

        public static delete(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Event.findOneAndRemove(req.params.id, (err: any, event: any): void => {
                if (err) {
                    res.send(400, err);
                } else {
                    res.send(event);
                }
            });
        }

        private static buildModelFromReq(req: ExpressServerRequest): any {
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

            return event;
        }
    }
}