/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/calendar.ts"/>

module MyCalendar.Controllers {
    export class Calendar {
        public static create(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            console.log('yo');
            // Note: passing the body only works because of the validation feature.
            // Note: we delete the ids in order to force Mongoose to generate it by itself (and also to avoid stupid hackers messing up with the db...).
            delete req.body._id;
            delete req.body.id;
            
            Models.Calendar.create(req.body, (err: any, calendar: any): void => {
                if (err || !calendar) {
                    res.send(400, err);
                } else {
                    res.send(calendar);
                }
            });
        }

        public static find(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Calendar.find(req.body, (err: any, calendars: any): void => {
                if (err) {
                    res.send(400, err);
                } else {
                    res.send(calendars);
                }
            });
        }

        public static findById(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Calendar.findById(req.params.id, (err: any, calendar: any): void => {
                if (err || !calendar) {
                    res.send(404, err);
                } else {
                    res.send(calendar);
                }
            });
        }

        public static update(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            delete req.body._id;
            delete req.body.id;
            console.log(req.params.id);
            console.log(req.body);

            Models.Calendar.findById(req.params.id, (err: any, calendar: any): void => {
                if (err || !calendar) {
                    // If nothing found, creates it.
                    Calendar.create(req, res, next);
                } else {
                    Models.Calendar.findByIdAndUpdate(req.params.id, req.body, (err: any, calendar: any): void => {
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

        public static delete(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Calendar.findOneAndRemove(req.params.id, (err: any, calendar: any): void => {
                if (err || !calendar) {
                    res.send(400, err);
                } else {
                    res.send(calendar);
                }
            });
        }
    }
}