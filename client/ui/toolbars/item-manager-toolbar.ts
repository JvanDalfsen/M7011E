/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="./itoolbar.ts"/>

module MyCalendar.UI.Toolbars {
    /**
     * Interface that every toolbar should implements.
     */
    export class ItemManagerToolbar implements IToolbar {
        public onload(): void {
            $("#calendar-button").click(function () {
                MyCalendar.UI.PanelHost.getInstance().popPanel();
            });
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['item-manager-panel-toolbar']());
        }
    }
}

