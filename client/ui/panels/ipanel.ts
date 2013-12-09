/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../idynamic-view.ts"/>
/// <reference path="../toolbars/itoolbar.ts"/>

module MyCalendar.UI.Panels {
    /**
     * Interface that every panel should implements in order to be use by the panel-manager coupled with the breacrumb!
     */
    export interface IPanel extends IDynamicView {
        /**
         * The name of the panel. (Will be use in the breadcrumb)
         */
        name(): string;

        /**
         * The toolbar linked with this panel (can be null).
         */
        toolbar(): Toolbars.IToolbar;

        /**
         * Return true if the search is enabled on this panel; false otherwise.
         */
        searchEnable(): boolean;

        /**
         * Event called when someone enter a query in the search box.
         */
        onSearch(query: string): void;
    }
}

