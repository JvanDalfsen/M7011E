/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./controllers/calendar.ts"/>

module MyCalendar {
    export class Router {
        public static setupRoutes(app: Express): void {
            this.setupCalendarsRoutes(app);
        }

        private static setupCalendarsRoutes(app: Express): void {
            app.post('/calendars', Controllers.Calendar.create);
            app.get('/calendars', Controllers.Calendar.find);
            app.get('/calendars/:id', Controllers.Calendar.findById);
            app.put('/calendars/?:id', Controllers.Calendar.update);
            app.del('/calendars/:id', Controllers.Calendar.delete);
        }
    }
}