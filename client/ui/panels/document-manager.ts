/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/document-manager-toolbar.ts"/>

module MyCalendar.UI.Panels {
    export class DocumentManagerPanel implements IPanel {
        private _uploadArea: JQuery;

        public onload(): void {
            this._uploadArea = $('upload-area');

            this._uploadArea.on("dragover", this.onFileDragOver);
            this._uploadArea.on("dragleave", this.onFileDragLeave);
            // uploadArea.on("drop", FileDragHover);
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['document-manager-panel']());
        }

        private onFileDragOver() {
            this._uploadArea.addClass('drag-over');
        }

        private onFileDragLeave() {
            this._uploadArea.removeClass('drag-over');
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