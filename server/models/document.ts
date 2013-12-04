/// <reference path="../definitions/server.d.ts"/>

module MyCalendar.Models {
    var mongoose = require('mongoose');

    var documentSchema = new mongoose.Schema({
        name: { type: String, required: 'Name is required!' },
        data: { type: Buffer, required: 'A document can\'t be empty' },
        type: { type: String }
        // TODO: add an owner.
    });

    documentSchema.path('name').validate((name: string, respond: (boolean) => void): void => {
        // TODO: check that the document name is unique for the owner.

        respond(true);
    });

    export var Document = mongoose.model('Document', documentSchema);
}