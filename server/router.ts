/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./controllers/calendar.ts"/>
/// <reference path="./controllers/event.ts"/>

module MyCalendar {
    export class Router {
        private static _apiRoot = '/api';

        public static setupRoutes(app: Express): void {
            this.setupCalendarsRoutes(app);
            this.setupEventsRoutes(app);
        }

        private static setupCalendarsRoutes(app: Express): void {
            /**
             * Creates a new calendar.
             * Request type: POST
             * URI: /calendars
             *
             * @param {String} name The name of this new calendar.
             * @param {Array<mongoose.Schema.Types.ObjectId>} events A list of events id that will be linked to this calendar.
             * @return {Models.Calendar} The newly created calendar in JSON format. 
             */
            app.post(this._apiRoot + '/calendars', Controllers.Calendar.create);
            
            /**
             * Finds some calendars according to a query.
             * Request type: GET
             * URI: /calendars
             * 
             * @param [String] name The name of this calendar.
             * @param [Array<mongoose.Schema.Types.ObjectId>] events A list of events id that these calendar would be linked.
             * @return {Array<Models.Calendar>} The calendars that matches the query in JSON format.
             */
            app.get(this._apiRoot + '/calendars', Controllers.Calendar.find);

            /**
             * Finds one calendar.
             * Request type: GET
             * URI: /calendars/:id
             * 
             * @param {mongoose.Schema.Types.ObjectId} id The id of the calendar.
             * @return {Models.Calendar} The calendar in JSON format. 
             */
            app.get(this._apiRoot + '/calendars/:id', Controllers.Calendar.findById);

            /**
             * Updates one calendar or creates it if the id isn't in the database.
             * Request type: PUT
             * URI: /calendars/?:id
             * 
             * @param {mongoose.Schema.Types.ObjectId} id The id of the calendar.
             * @param [String] name The name of this new calendar.
             * @param [Array<mongoose.Schema.Types.ObjectId>] events A list of events id that will be linked to this calendar.
             * @return {Models.Calendar} The calendar in JSON format.
             */
            app.put(this._apiRoot + '/calendars/:id?', Controllers.Calendar.update);

            /**
             * Deletes one calendar.
             * Request type: DELETE
             * URI: /calendars/:id
             * 
             * @param {mongoose.Schema.Types.ObjectId} id The id of the calendar.
             * @return {Models.Calendar} The calendar in JSON format. 
             */
            app.del(this._apiRoot + '/calendars/:id', Controllers.Calendar.delete);
        }

        private static setupEventsRoutes(app: Express): void {
            /**
             * Creates a new event.
             * Request type: POST
             * URI: /events
             *
             * @param {String} name The name of this new event.
             * @param {String} description The description of this new event.
             * @param {Date} begin The beginning date of this new event.
             * @param {Date} end The end date of this new event.
             * @return {Models.Event} The newly created event in JSON format. 
             */
            app.post(this._apiRoot + '/events', Controllers.Event.create);

            /**
             * Finds some events according to a query.
             * Request type: GET
             * URI: /events
             * 
             * @param [String] name The name of this event.
             * @param [String] description The description of these events.
             * @param [Date] begin The beginning date of these events.
             * @param [Date] end The end date of these events.
             * @return {Array<Models.Event>} The events that matches the query in JSON format.
             */
            app.get(this._apiRoot + '/events', Controllers.Event.find);

            /**
             * Finds one event.
             * Request type: GET
             * URI: /events/:id
             * 
             * @param {mongoose.Schema.Types.ObjectId} id The id of the event.
             * @return {Models.Event} The event in JSON format. 
             */
            app.get(this._apiRoot + '/events/:id', Controllers.Event.findById);

            /**
             * Updates one event.
             * Request type: UPDATE
             * URI: /events/?:id
             * 
             * @param [String] name The name of this new event.
             * @param [String] description The description of this new event.
             * @param [Date] begin The beginning date of this new event.
             * @param [Date] end The end date of this new event.
             * @return {Models.Event} The event in JSON format.
             */
            app.put(this._apiRoot + '/events/?:id', Controllers.Event.update);

            /**
             * Deletes one event.
             * Request type: DELETE
             * URI: /events/:id
             * 
             * @param {mongoose.Schema.Types.ObjectId} id The id of the event.
             * @return {Models.Event} The event in JSON format. 
             */
            app.del(this._apiRoot + '/events/:id', Controllers.Event.delete);
        }
    }
}