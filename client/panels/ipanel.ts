/// <reference path="../definitions/jquery.d.ts"/>


module MyCalendar.Panels {
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
        view(): JQuery ;
    }
}

