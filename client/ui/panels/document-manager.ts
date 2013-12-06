/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/document-manager-toolbar.ts"/>

module MyCalendar.UI.Panels {
    export class DocumentManagerPanel implements IPanel {
        private static DOCUMENT_MAX_SIZE = 20971520;
        private _uploadArea: JQuery;

        public onload(): void {
            this._uploadArea = $('#upload-area');

            this._uploadArea.on("dragover", this.onFileDragOver.bind(this));
            this._uploadArea.on("dragleave", this.onFileDragLeave.bind(this));
            this._uploadArea.on("drop", this.onFileDrop.bind(this));
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['document-manager-panel']());
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

            var files = (<any>event.target).files;

            if (!files) {
                return;
            }

            for (var i = 0; i < files.length; ++i) {
                if (files[i].size < DocumentManagerPanel.DOCUMENT_MAX_SIZE) {
                    documentsRepository.create({ name: files[i].name, document: files[i] });
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
            return false;
        }

        public onSearch(query: string): void {
            // TODO!
        }
    }
}