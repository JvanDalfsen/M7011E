/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./controllers/calendar.ts"/>
/// <reference path="./controllers/event.ts"/>
/// <reference path="./controllers/document.ts"/>

import express = require('express');
import CalendarController = require('./controllers/calendar');
import DocumentController = require('./controllers/document');
import EventController    = require('./controllers/event');
import UserController = require('./controllers/user');

var passport = require('passport');

export class Router {
    private static _apiRoot = '/api';

    public static setupRoutes(app: express.Application): void {
        this.setupCalendarsRoutes(app);
        this.setupEventsRoutes(app);
        this.setupDocumentsRoutes(app);
        this.setupPassportRoutes(app);
    }

    private static setupCalendarsRoutes(app: express.Application): void {
        /**
            * Creates a new calendar.
            * Request type: POST
            * URI: /calendars
            *
            * @param {String} name The name of this new calendar.
            * @param {Array<mongoose.Schema.Types.ObjectId>} events A list of events id that will be linked to this calendar.
            * @return {Models.Calendar} The newly created calendar in JSON format. 
            */
        app.post(this._apiRoot + '/calendars', CalendarController.Calendar.create);
            
        /**
            * Finds some calendars according to a query.
            * Request type: GET
            * URI: /calendars
            * 
            * @param [String] name The name of this calendar.
            * @param [Array<mongoose.Schema.Types.ObjectId>] events A list of events id that these calendar would be linked.
            * @return {Array<Models.Calendar>} The calendars that matches the query in JSON format.
            */
        app.get(this._apiRoot + '/calendars', CalendarController.Calendar.find);

        /**
            * Finds one calendar.
            * Request type: GET
            * URI: /calendars/:id
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the calendar.
            * @return {Models.Calendar} The calendar in JSON format. 
            */
        app.get(this._apiRoot + '/calendars/:id', CalendarController.Calendar.findById);

        /**
            * Updates one calendar or creates it if the id isn't in the database.
            * Request type: PUT
            * URI: /calendars/?:id
            *
            * Notes: if the calendar doesn't exist, it will be created. 
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the calendar.
            * @param [String] name The name of this new calendar.
            * @param [Array<mongoose.Schema.Types.ObjectId>] events A list of events id that will be linked to this calendar.
            * @return {Models.Calendar} The calendar in JSON format.
            */
        app.put(this._apiRoot + '/calendars/:id?', CalendarController.Calendar.update);

        /**
            * Deletes one calendar.
            * Request type: DELETE
            * URI: /calendars/:id
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the calendar.
            * @return {Models.Calendar} The calendar in JSON format. 
            */
        app.del(this._apiRoot + '/calendars/:id', CalendarController.Calendar.delete);
    }

    private static setupEventsRoutes(app: express.Application): void {
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
        app.post(this._apiRoot + '/events', EventController.Event.create);

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
        app.get(this._apiRoot + '/events', EventController.Event.find);

        /**
            * Finds one event.
            * Request type: GET
            * URI: /events/:id
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the event.
            * @return {Models.Event} The event in JSON format. 
            */
        app.get(this._apiRoot + '/events/:id', EventController.Event.findById);

        /**
            * Updates one event.
            * Request type: UPDATE
            * URI: /events/?:id
            *
            * Notes: if the event doesn't exist, it will be created. 
            * 
            * @param [String] name The name of this new event.
            * @param [String] description The description of this new event.
            * @param [Date] begin The beginning date of this new event.
            * @param [Date] end The end date of this new event.
            * @return {Models.Event} The event in JSON format.
            */
        app.put(this._apiRoot + '/events/?:id', EventController.Event.update);

        /**
            * Deletes one event.
            * Request type: DELETE
            * URI: /events/:id
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the event.
            * @return {Models.Event} The event in JSON format. 
            */
        app.del(this._apiRoot + '/events/:id', EventController.Event.delete);
    }

    private static setupDocumentsRoutes(app: express.Application): void {
        /**
            * Creates a new document.
            * Request type: POST multipart
            * URI: /documents
            *
            * @param {String} name The name of this new document.
            * @param {File} The multipart upload. 
            * @return {Models.Event} The newly created document name, id and type. 
            */
        app.post(this._apiRoot + '/documents', DocumentController.Document.create);

        /**
            * Finds some events according to a query.
            * Request type: GET
            * URI: /documents
            * 
            * @param [String] name The name of this document.
            * @return {Array<Models.Event>} The documents that matches the query in JSON format.
            */
        app.get(this._apiRoot + '/documents', DocumentController.Document.find);

        /**
            * Finds one document.
            * Request type: GET
            * URI: /documents/:id
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the document.
            * @return {Models.Event} The document in JSON format. 
            */
        app.get(this._apiRoot + '/documents/:id', DocumentController.Document.findById);

        /**
            * Updates one event.
            * Request type: UPDATE
            * URI: /documents/?:id
            *
            * Notes: if the document doesn't exist, it will be created. 
            *
            * @param {mongoose.Schema.Types.ObjectId} id The id of the document.
            * @param [String] name The new name of this document.
            * @return {Models.Event} The document in JSON format.
            */
        app.put(this._apiRoot + '/documents/?:id', DocumentController.Document.update);

        /**
            * Deletes one document.
            * Request type: DELETE
            * URI: /documents/:id
            * 
            * @param {mongoose.Schema.Types.ObjectId} id The id of the document.
            * @return {Models.Event} The document in JSON format. 
            */
        app.del(this._apiRoot + '/documents/:id', DocumentController.Document.delete);
            
        /**
            * Download a document.
            * Request type: GET
            * URI: /documents/download/:id
            * 
            * @param[String] name The name of this document.
            * @return { Array<Models.Event>} The document's data.
            */
        app.get(this._apiRoot + '/documents/download/:id', DocumentController.Document.download);
    }

    public static setupPassportRoutes(app: express.Application): void {
        app.get(this._apiRoot + '/auth/google', passport.authenticate('google'));
        app.get(this._apiRoot + '/auth/google/return', passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: this._apiRoot + '/auth/failure'
        }));

        app.get(this._apiRoot + '/auth/logout', UserController.Event.logout);
        app.get(this._apiRoot + '/auth', UserController.Event.currentSession);
        app.get(this._apiRoot + '/auth/failure', UserController.Event.failure);
        app.put(this._apiRoot + '/auth', UserController.Event.update);
        app.del(this._apiRoot + '/auth', UserController.Event.delete);
    }
}
