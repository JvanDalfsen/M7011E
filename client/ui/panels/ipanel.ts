/// <reference path="../../definitions/jquery.d.ts"/>


module MyCalendar.UI.Panels {
    /**
     * Interface that every panel should implements in order to be use by the panel-manager coupled with the breacrumb!
     */
    export interface IPanel {
        /**
         * Event triggered when the panel is loaded.
         */
        onload(): void;

        /**
         * Event triggered when the panel is removed.
         */
        onremove(): void;

        /**
         * The view of this panel.
         */
        view(): JQuery;

        /**
         * The name of the panel. (Will be use in the breadcrumb)
         */
        name(): string;
    }
}

