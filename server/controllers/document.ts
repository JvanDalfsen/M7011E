/// <reference path="../definitions/server.d.ts"/>
/// <reference path="../models/document.ts"/>

module MyCalendar.Controllers {  
    var fs = require('fs');

    export class Document {
        // Limited to 20Mo.
        private static DOCUMENT_MAX_SIZE = 20971520;

        public static create(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            if (!req.files.document) {
                res.send(400, 'The document file is empty');

                return;
            }

            if (req.files.document.size > Document.DOCUMENT_MAX_SIZE) {
                res.send(400, 'The upload limit for documents is ' + Document.DOCUMENT_MAX_SIZE);

                return;
            }

            var newDocument = Document.buildModelFromReq(req);

            // If no name provided then we use the one from the file !
            newDocument.name = newDocument.name || req.files.document;
            newDocument.data = fs.readFileSync(req.files.document.path);
            newDocument.type = req.files.document.type;

            Models.Document.create(newDocument, (err: any, document: any): void => {
                if (err || !document) {
                    res.send(400, err);
                } else {
                    res.send({ _id: document._id, name: document.name, type: document.type });
                }
            });
        }

        public static download(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Document.findById(req.params.id, (err: any, document: any): void => {
                if (err || !document) {
                    res.send(400, err);
                } else {
                    res.contentType(document.type);
                    res.send(document.data);
                }
            });
        }

        public static find(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Document.find(req.body, 'name type', (err: any, documents: any): void => {
                if (err) {
                    res.send(400, err);
                } else {
                    res.send(documents);
                }
            });
        }

        public static findById(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Document.findById(req.params.id, 'name type', (err: any, document: any): void => {
                if (err || !document) {
                    res.send(404, err);
                } else {
                    res.send(document);
                }
            });
        }

        public static update(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
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

        public static delete(req: ExpressServerRequest, res: ExpressServerResponse, next: Function) {
            Models.Document.findOneAndRemove(req.params.id, (err: any, document: any): void => {
                if (err || !document) {
                    res.send(400, err);
                } else {
                    res.send({ _id: document._id, name: document.name, type: document.type });
                }
            });
        }

        private static buildModelFromReq(req: ExpressServerRequest): any {
            var document: any = {};

            if (req.body.name) {
                document.name = req.body.name;
            }

            return document;
        }
    }
}