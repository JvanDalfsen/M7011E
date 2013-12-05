/// <reference path="../definitions/jquery.d.ts"/>

module MyCalendar.UI {
    /**
     * Interface for all dynamic views.
     */
    export interface IDynamicView {
        /**
         * Event triggered when the panel is loaded.
         * For example, you could attach all your events in this method.
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
    }
}

