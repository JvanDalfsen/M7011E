/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/document.ts"/>

import express       = require('express');
import Models        = require('../models/document');


import fs            = require('fs');

export class Document {
    // Limited to 20Mo.
    private static DOCUMENT_MAX_SIZE = 20971520;

    public static create(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        if (req.xhr) {
            // If no name provided then we use the one from the file !
            var newDocument: any = {};
            newDocument.name = req.header('X-File-Name');
            newDocument.type = req.header('X-File-Type');
            var documentSize = parseInt(req.header('X-File-Size'));
            newDocument.owner = req.user._id;

            if (documentSize >= Document.DOCUMENT_MAX_SIZE) {
                res.send(400, 'The upload limit for documents is 20Mo');
            } else {
                var data = [];

                (<any>req).on('data', (chunk) => {
                    data.push(chunk);
                }).on('end',  () => {
                    var buffer = Buffer.concat(data);
                    newDocument.data = buffer;

                    Models.Document.create(newDocument, (err: any, document: any): void => {
                        if (err || !document) {
                            res.send(400, err);
                        } else {
                            res.send({ _id: document._id, name: document.name, type: document.type });
                        }
                    });
                });               
            }
        }  
    }

    public static download(req: express.Request, res: express.Response, next: Function) {
        Models.Document.findById(req.params.id, (err: any, document: any): void => {
            if (err || !document) {
                res.send(400, err);
            } else {
                res.contentType(document.type);
                res.send(document.data);
            }
        });
    }

    public static find(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }
        req.body.owner = req.user._id;

        Models.Document.find(req.body, 'name type', (err: any, documents: any): void => {
            if (err) {
                res.send(400, err);
            } else {
                res.send(documents);
            }
        });
    }

    public static findById(req: express.Request, res: express.Response, next: Function) {
        Models.Document.findById(req.params.id, 'name type', (err: any, document: any): void => {
            if (err || !document) {
                res.send(404, err);
            } else {
                res.send(document);
            }
        });
    }

    public static update(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Document.findById(req.params.id, (err: any, document: any): void => {
            if (err || !document) {
                // If nothing found, creates it.
                Document.create(req, res, next);
            } else {
                var updatedName = Document.buildModelFromReq(req);

                Models.Document.findByIdAndUpdate(req.params.id, updatedName, (err: any, document: any): void => {
                    if (err || !document) {
                        res.send(400, err);
                        console.log(err);
                    } else {
                        res.send({ _id: document._id, name: document.name, type: document.type });
                    }
                });
            }
        });
    }

    public static delete(req: express.Request, res: express.Response, next: Function) {
        if (!req.user) {
            res.send(400, 'The user must be logged');
            return;
        }

        Models.Document.findByIdAndRemove(req.params.id, (err: any, document: any): void => {
            if (err || !document) {
                res.send(400, err);
            } else {
                res.send({ _id: document._id, name: document.name, type: document.type });
            }
        });
    }

    private static buildModelFromReq(req: express.Request): any {
        var document: any = {};

        if (req.body.name) {
            document.name = req.body.name;
        }

        return document;
    }
}
