/// <reference path="../definitions/server.d.ts"/>
/// <reference path="./event.ts"/>

module MyCalendar.Models {
    var mongoose = require('mongoose');

    var calendarSchema = new mongoose.Schema({
        name: { type: String, required: 'Name is required!' },
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' /* validate: cf below */}]
        // TODO: add an owner.
    });

    /**
     * Check that the events' id are valids.
     */
    calendarSchema.path('events').validate((value: any, respond: (boolean) => void): void => {
        Event.findById(value, (err: any, event: any): void => {
            if (err || !event) {
                respond(false);
            }

            respond(true);
        });
    }, 'Invalid ObjectId for the event');

    export var Calendar = mongoose.model('Calendar', calendarSchema);
}