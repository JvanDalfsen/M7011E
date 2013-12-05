/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>


module MyCalendar.UI.Panels {
    export class DocumentManagerPanel implements IPanel {
        private uploadArea: JQuery;

        public onload(): void {
            this.uploadArea = $('upload-area');

            this.uploadArea.on("dragover", this.onFileDragOver);
            this.uploadArea.on("dragleave", this.onFileDragLeave);
            // uploadArea.on("drop", FileDragHover);
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['upload-panel']());
        }

        private onFileDragOver() {
            console.log('over');
            this.uploadArea.addClass('drag-over');
        }

        private onFileDragLeave() {
            this.uploadArea.removeClass('drag-over');
        }

        public name(): string {
            return 'Document Manager';
        }
    }
}