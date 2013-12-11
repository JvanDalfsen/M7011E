/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/document.ts"/>
var express = require('express');
var Models = require('../models/document');

var Document = (function () {
    function Document() {
    }
    Document.create = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        if (req.xhr) {
            // If no name provided then we use the one from the file !
            var newDocument = {};
            newDocument.name = req.header('X-File-Name');
            newDocument.type = req.header('X-File-Type');
            var documentSize = parseInt(req.header('X-File-Size'));
            newDocument.owner = req.user._id;

            if (documentSize >= Document.DOCUMENT_MAX_SIZE) {
                res.send(400, 'The upload limit for documents is 20Mo');
            } else {
                var data = [];

                req.on('data', function (chunk) {
                    data.push(chunk);
                }).on('end', function () {
                    var buffer = Buffer.concat(data);
                    newDocument.data = buffer;

                    Models.Document.create(newDocument, function (err, document) {
                        if (err || !document) {
                            res.send(400, err);
                        } else {
                            res.send({ _id: document._id, name: document.name, type: document.type });
                        }
                    });
                });
            }
        }
    };

    Document.download = function (req, res, next) {
        Models.Document.findById(req.params.id, function (err, document) {
            if (err || !document) {
                res.send(400, err);
            } else {
                res.contentType(document.type);
                res.send(document.data);
            }
        });
    };

    Document.find = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }
        req.body.owner = req.user._id;

        Models.Document.find(req.body, 'name type', function (err, documents) {
            if (err) {
                res.send(400, err);
            } else {
                res.send(documents);
            }
        });
    };

    Document.findById = function (req, res, next) {
        Models.Document.findById(req.params.id, 'name type', function (err, document) {
            if (err || !document) {
                res.send(404, err);
            } else {
                res.send(document);
            }
        });
    };

    Document.update = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Document.findById(req.params.id, function (err, document) {
            if (err || !document) {
                // If nothing found, creates it.
                Document.create(req, res, next);
            } else {
                var updatedName = Document.buildModelFromReq(req);

                Models.Document.findByIdAndUpdate(req.params.id, updatedName, function (err, document) {
                    if (err || !document) {
                        res.send(400, err);
                        console.log(err);
                    } else {
                        res.send({ _id: document._id, name: document.name, type: document.type });
                    }
                });
            }
        });
    };

    Document.delete = function (req, res, next) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Document.findByIdAndRemove(req.params.id, function (err, document) {
            if (err || !document) {
                res.send(400, err);
            } else {
                res.send({ _id: document._id, name: document.name, type: document.type });
            }
        });
    };

    Document.buildModelFromReq = function (req) {
        var document = {};

        if (req.body.name) {
            document.name = req.body.name;
        }

        return document;
    };
    Document.DOCUMENT_MAX_SIZE = 20971520;
    return Document;
})();
exports.Document = Document;
//# sourceMappingURL=document.js.map
