var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        /// <reference path="../../definitions/jquery.d.ts"/>
        /// <reference path="../../definitions/handlebars.d.ts"/>
        /// <reference path="../../repository.ts"/>
        /// <reference path="./ipanel.ts"/>
        /// <reference path="../toolbars/document-manager-toolbar.ts"/>
        (function (Panels) {
            var DocumentManagerPanel = (function () {
                function DocumentManagerPanel(eventId) {
                    if (typeof eventId === "undefined") { eventId = null; }
                    DocumentManagerPanel.currentEventId = eventId;
                    DocumentManagerPanel.pickedDocumentIds = [];
                }
                DocumentManagerPanel.prototype.onload = function () {
                    var _this = this;
                    this._uploadArea = $('#upload-area');
                    this._panel = $('#document-manager-panel');

                    this._uploadArea.on("dragover", this.onFileDragOver.bind(this));
                    this._uploadArea.on("dragleave", this.onFileDragLeave.bind(this));
                    this._uploadArea.on("drop", this.onFileDrop.bind(this));

                    if (DocumentManagerPanel.currentEventId) {
                        MyCalendar.eventsRepository.findById(DocumentManagerPanel.currentEventId).done(function (event) {
                            DocumentManagerPanel.pickedDocumentIds = event.documents.map(function (value) {
                                return value.id;
                            });

                            _this.updateDocumentList();
                        });
                    } else {
                        this.updateDocumentList();
                    }

                    $("#save-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    });
                };

                DocumentManagerPanel.prototype.onremove = function () {
                };

                DocumentManagerPanel.prototype.view = function () {
                    return $(Handlebars.templates['document-manager-panel']());
                };

                DocumentManagerPanel.prototype.updateDocumentList = function (query) {
                    var _this = this;
                    this._panel.find('.uploaded-file').remove();

                    MyCalendar.documentsRepository.find({}).done(function (documents) {
                        _this._panel.find('.uploaded-file').remove();
                        documents.forEach(function (document) {
                            if (query) {
                                if (document.name.toUpperCase().indexOf(query.toUpperCase()) == -1) {
                                    return;
                                }
                            }

                            var params = document;

                            if (document.type == 'image%2Fjpeg' || document.type == 'image%2Fpng') {
                                params.picture_path = '/api/documents/download/' + document.getRefId();
                            }

                            params.document_path = '/api/documents/download/' + document.getRefId();

                            if (DocumentManagerPanel.currentEventId) {
                                if (DocumentManagerPanel.pickedDocumentIds.indexOf(document.getRefId()) != -1) {
                                    params.selected = true;
                                }
                            }

                            var documentItem = $(Handlebars.templates['document-item'](params));
                            _this._panel.append(documentItem);

                            documentItem.find('.delete-document').click(function (ev) {
                                ev.stopPropagation();
                                MyCalendar.documentsRepository.deleteById(document.getRefId()).done(function () {
                                    if (DocumentManagerPanel.currentEventId) {
                                        var index = DocumentManagerPanel.pickedDocumentIds.indexOf(document.getRefId());

                                        if (index > -1) {
                                            DocumentManagerPanel.pickedDocumentIds.splice(index, 1);
                                        }
                                    }
                                    _this.updateDocumentList();
                                });
                            });

                            documentItem.find('.file-title').children().on('input', function (ev) {
                                ev.stopPropagation();
                                MyCalendar.documentsRepository.update(document.getRefId(), { name: documentItem.find('.file-title').children().first().val() });
                            });

                            documentItem.find('.file-title').click(function (ev) {
                                ev.stopPropagation();
                            });

                            if (DocumentManagerPanel.currentEventId) {
                                documentItem.click(function () {
                                    var index = DocumentManagerPanel.pickedDocumentIds.indexOf(document.getRefId());

                                    if (index > -1) {
                                        DocumentManagerPanel.pickedDocumentIds.splice(index, 1);
                                    } else {
                                        DocumentManagerPanel.pickedDocumentIds.push(document.getRefId());
                                    }

                                    _this.updateDocumentList();
                                });
                            }
                        });
                    });
                };

                DocumentManagerPanel.prototype.onFileDragOver = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._uploadArea.addClass('drag-over');
                };

                DocumentManagerPanel.prototype.onFileDragLeave = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._uploadArea.removeClass('drag-over');
                };

                DocumentManagerPanel.prototype.onFileDrop = function (event) {
                    var _this = this;
                    event.preventDefault();
                    event.stopPropagation();
                    this._uploadArea.removeClass('drag-over');

                    var files = (event.originalEvent.target).files || (event.originalEvent).dataTransfer.files;

                    if (!files) {
                        return;
                    }

                    var xhr = new XMLHttpRequest();

                    if (xhr.upload) {
                        for (var i = 0; i < files.length; ++i) {
                            if (files[i].size < DocumentManagerPanel.DOCUMENT_MAX_SIZE) {
                                var uploadingItem = $(Handlebars.templates['document-item-upload']({ name: files[i].name }));
                                uploadingItem.insertAfter(this._panel.children().first());

                                xhr.upload.addEventListener('progress', function (ev) {
                                    var pc = 100 - (ev.loaded / ev.total * 100);

                                    if (pc > 0) {
                                        uploadingItem.find('.uploading-progress').css('width', pc + '%');
                                    }
                                });

                                xhr.onreadystatechange = function (ev) {
                                    if (xhr.readyState == 4) {
                                        if (xhr.status == 200) {
                                            uploadingItem.remove();
                                            _this.updateDocumentList();
                                        } else {
                                            uploadingItem.css('background-color', 'red');
                                            uploadingItem.find('.uploading-progress').css('red');
                                        }
                                    }
                                };

                                xhr.open('POST', MyCalendar.Repository.ApiRoot + '/documents', true);
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('X-File-Name', encodeURIComponent(files[i].name));
                                xhr.setRequestHeader('X-File-Size', encodeURIComponent(files[i].size));
                                xhr.setRequestHeader('X-File-Type', encodeURIComponent(files[i].type));
                                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                                xhr.send(files[i]);
                            }
                        }
                    }
                };

                DocumentManagerPanel.prototype.name = function () {
                    return 'Document Manager';
                };

                DocumentManagerPanel.prototype.toolbar = function () {
                    return new UI.Toolbars.DocumentManagerToolbar();
                };

                DocumentManagerPanel.prototype.searchEnable = function () {
                    return true;
                };

                DocumentManagerPanel.prototype.onSearch = function (query) {
                    this.updateDocumentList(query);
                };
                DocumentManagerPanel.DOCUMENT_MAX_SIZE = 20971520;
                return DocumentManagerPanel;
            })();
            Panels.DocumentManagerPanel = DocumentManagerPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
