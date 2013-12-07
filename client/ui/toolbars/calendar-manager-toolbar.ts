/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="./itoolbar.ts"/>

module MyCalendar.UI.Toolbars {
    /**
     * Interface that every toolbar should implements.
     */
    export class CalendarManagerToolbar implements IToolbar {
        public onload(): void {
            // Empty now.
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['calendar-manager-panel-toolbar']());
        }
    }
}

