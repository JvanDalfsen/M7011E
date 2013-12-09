/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./idynamic-view.ts"/>
/// <reference path="../definitions/handlebars.d.ts"/>

module MyCalendar.UI {
    export class BreadcrumbButton implements IDynamicView {
        private _view: JQuery;

        constructor(private _name: string) {
            this._view = $(Handlebars.templates['breadcrumb-button']({ title: this._name }));
        }

        public onload(): void {

        }

        public onremove(): void {

        }

        public select(value: boolean): void {
            if (value) {
                this._view.children().attr('selected', value);
            } else {
                this._view.children().removeAttr('selected');
            }
        }

        public view(): JQuery {
            return this._view;
        }
    }
}

