var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        /// <reference path="../../definitions/jquery.d.ts"/>
        /// <reference path="../../definitions/handlebars.d.ts"/>
        /// <reference path="./itoolbar.ts"/>
        (function (Toolbars) {
            /**
            * Interface that every toolbar should implements.
            */
            var HomeToolbar = (function () {
                function HomeToolbar() {
                }
                HomeToolbar.prototype.onload = function () {
                    // Empty now.
                };

                HomeToolbar.prototype.onremove = function () {
                };

                HomeToolbar.prototype.view = function () {
                    return $(Handlebars.templates['home-panel-toolbar']());
                };
                return HomeToolbar;
            })();
            Toolbars.HomeToolbar = HomeToolbar;
        })(UI.Toolbars || (UI.Toolbars = {}));
        var Toolbars = UI.Toolbars;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
