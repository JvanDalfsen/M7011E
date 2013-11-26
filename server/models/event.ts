/// <reference path="../definitions/server.d.ts"/>

module MyCalendar.Models {
    var mongoose = require('mongoose');

    var eventSchema = new mongoose.Schema({
        name:        { type: String, required: true },
        description: String,
        begin:       { type: Date, required: true },
        end:         { type: Date, required: true },
        // TODO: add an events.
        // TODO: Ensure that this event is linked to at least one calendar otherwise destroy it.  
    });

    function checkDate(next: (err?: string) => void) {
        if (this.begin < this.end) {
            next();
        }

        var error = new mongoose.Error.ValidationError(this);
        error['date'] = 'The begin\'s date should be before the end\'s date';

        next(error);
    }

    eventSchema.pre('save', checkDate);

    export var Event = mongoose.model('Event', eventSchema);
}