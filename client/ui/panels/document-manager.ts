﻿/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/document-manager-toolbar.ts"/>

module MyCalendar.UI.Panels {
    export class DocumentManagerPanel implements IPanel {
        private static DOCUMENT_MAX_SIZE = 20971520;
        private _uploadArea: JQuery;
        private _panel: JQuery;
        private static currentEventId: string;
        public static pickedDocumentIds: Array<string>;


        constructor(eventId: string = null) {
            DocumentManagerPanel.currentEventId    = eventId;
            DocumentManagerPanel.pickedDocumentIds = null;
        }


        public onload(): void {
            this._uploadArea = $('#upload-area');
            this._panel      = $('#document-manager-panel');

            this._uploadArea.on("dragover", this.onFileDragOver.bind(this));
            this._uploadArea.on("dragleave", this.onFileDragLeave.bind(this));
            this._uploadArea.on("drop", this.onFileDrop.bind(this));

            if (DocumentManagerPanel.currentEventId) {
                eventsRepository.findById(DocumentManagerPanel.currentEventId).done((event: Models.Event) => {
                    DocumentManagerPanel.pickedDocumentIds = event.documents.map((value: Models.Ref<Models.Document>) => {
                        return value.id;
                    });

                    this.updateDocumentList();
                });                
            } else {
                this.updateDocumentList();
            }

            $("#save-button").click(() => {
                MyCalendar.UI.PanelHost.getInstance().popPanel();
            });
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['document-manager-panel']());
        }

        private updateDocumentList(query?: string): void {
            this._panel.find('.uploaded-file').remove();

            documentsRepository.find({}).done((documents: Array<Models.Document>): void => {
                this._panel.find('.uploaded-file').remove();
                documents.forEach((document: Models.Document) => {

                    // If the filter is applied.
                    if (query) {
                        if (document.name.toUpperCase().indexOf(query.toUpperCase()) == -1) {
                            return;
                        }
                    }

                    var params: any = document;

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
                    this._panel.append(documentItem);

                    documentItem.find('.delete-document').click((ev: JQueryEventObject) => {
                        ev.stopPropagation();
                        documentsRepository.deleteById(document.getRefId()).done(() => {
                            if (DocumentManagerPanel.currentEventId) {
                                var index = DocumentManagerPanel.pickedDocumentIds.indexOf(document.getRefId());

                                if (index > -1) {
                                    DocumentManagerPanel.pickedDocumentIds.splice(index, 1);
                                }
                            }
                            this.updateDocumentList();
                        });
                    });

                    documentItem.find('.file-title').children().on('input', (ev: JQueryEventObject) => {
                        ev.stopPropagation();
                        documentsRepository.update(document.getRefId(), { name: documentItem.find('.file-title').children().first().val() });
                    });

                    documentItem.find('.file-title').click((ev: JQueryEventObject) => {
                        ev.stopPropagation();
                    });

                    if (DocumentManagerPanel.currentEventId) {
                        documentItem.click(() => {
                            var index = DocumentManagerPanel.pickedDocumentIds.indexOf(document.getRefId());

                            if (index > -1) {
                                DocumentManagerPanel.pickedDocumentIds.splice(index, 1);
                            } else {
                                DocumentManagerPanel.pickedDocumentIds.push(document.getRefId());
                            }

                            this.updateDocumentList();
                        });
                    }
                });
            });
        }

        private onFileDragOver(event: JQueryEventObject) {
            event.preventDefault();
            event.stopPropagation();
            this._uploadArea.addClass('drag-over');
        }

        private onFileDragLeave(event: JQueryEventObject) {
            event.preventDefault();
            event.stopPropagation();
            this._uploadArea.removeClass('drag-over');
        }

        private onFileDrop(event: JQueryEventObject) {
            event.preventDefault();
            event.stopPropagation();
            this._uploadArea.removeClass('drag-over');

            var files = (<any>event.originalEvent.target).files || (<any>event.originalEvent).dataTransfer.files;

            if (!files) {
                return;
            }

            var xhr = new XMLHttpRequest();

            if (xhr.upload) {
                for (var i = 0; i < files.length; ++i) {
                    if (files[i].size < DocumentManagerPanel.DOCUMENT_MAX_SIZE) {

                        var uploadingItem = $(Handlebars.templates['document-item-upload']({ name: files[i].name}));
                        uploadingItem.insertAfter(this._panel.children().first());

                        xhr.upload.addEventListener('progress', (ev: ProgressEvent) => {
                            var pc = 100 - (ev.loaded / ev.total * 100);

                            if (pc > 0) {
                                uploadingItem.find('.uploading-progress').css('width', pc + '%');
                            }
                        });

                        xhr.onreadystatechange = (ev: any) => {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    uploadingItem.remove();
                                    this.updateDocumentList();
                                } else {
                                    uploadingItem.css('background-color', 'red');
                                    uploadingItem.find('.uploading-progress').css('red');
                                }
                            }
                        };

                        xhr.open('POST', Repository.ApiRoot + '/documents', true);
                        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        xhr.setRequestHeader('X-File-Name', encodeURIComponent(files[i].name));
                        xhr.setRequestHeader('X-File-Size', encodeURIComponent(files[i].size));
                        xhr.setRequestHeader('X-File-Type', encodeURIComponent(files[i].type));
                        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                        xhr.send(files[i]);
                    }
                }
            }
        }

        public name(): string {
            return 'Document Manager';
        }

        public toolbar(): Toolbars.IToolbar {
            return new Toolbars.DocumentManagerToolbar();
        }

        public searchEnable(): boolean {
            return true;
        }

        public onSearch(query: string): void {
            this.updateDocumentList(query);
        }
    }
}