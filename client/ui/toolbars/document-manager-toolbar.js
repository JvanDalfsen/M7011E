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
            var DocumentManagerToolbar = (function () {
                function DocumentManagerToolbar() {
                }
                DocumentManagerToolbar.prototype.onload = function () {
                    // Empty now.
                };

                DocumentManagerToolbar.prototype.onremove = function () {
                };

                DocumentManagerToolbar.prototype.view = function () {
                    return $(Handlebars.templates['document-manager-panel-toolbar']());
                };
                return DocumentManagerToolbar;
            })();
            Toolbars.DocumentManagerToolbar = DocumentManagerToolbar;
        })(UI.Toolbars || (UI.Toolbars = {}));
        var Toolbars = UI.Toolbars;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
