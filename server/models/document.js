/// <reference path="../definitions/server.d.ts"/>
var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
    name: { type: String, required: 'Name is required!' },
    data: { type: Buffer, required: 'A document can\'t be empty' },
    type: { type: String }
});

documentSchema.path('name').validate(function (name, respond) {
    // TODO: check that the document name is unique for the owner.
    respond(true);
});

exports.Document = mongoose.model('Document', documentSchema);
//# sourceMappingURL=document.js.map
