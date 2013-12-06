/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>


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
            return $(Handlebars.templates['upload-panel']());
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
            return null;
        }

        public searchEnable(): boolean {
            return true;
        }

        public onSearch(query: string): void {
            // TODO!
        }
    }
}