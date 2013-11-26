/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/event.ts"/>

module MyCalendar.Controllers {
    export class Event {
        public static create(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            delete req.body._id;
            delete req.body.id;

            Models.Event.create(req.body, (err: any, event: any): void => {
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
            Models.Event.findByIdAndUpdate(req.params.id, req.body, (err: any, event: any): void => {
                if (err || !event) {
                    res.send(400, err);
                } else {
                    res.send(event);
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
    }
}