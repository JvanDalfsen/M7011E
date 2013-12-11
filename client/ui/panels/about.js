var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        /// <reference path="../../definitions/jquery.d.ts"/>
        /// <reference path="../../definitions/handlebars.d.ts"/>
        /// <reference path="../../repository.ts"/>
        /// <reference path="./ipanel.ts"/>
        /// <reference path="../toolbars/home-toolbar.ts"/>
        /// <reference path="../../models/user.ts"/>
        /// <reference path="../panel-host.ts"/>
        /// <reference path="../panels/calendar-manager.ts"/>
        (function (Panels) {
            var AboutPanel = (function () {
                function AboutPanel() {
                }
                AboutPanel.prototype.onload = function () {
                };

                AboutPanel.prototype.onremove = function () {
                };

                AboutPanel.prototype.view = function () {
                    return $(Handlebars.templates['about-panel']());
                };

                AboutPanel.prototype.name = function () {
                    return 'About';
                };

                AboutPanel.prototype.toolbar = function () {
                    return null;
                };

                AboutPanel.prototype.searchEnable = function () {
                    return false;
                };

                AboutPanel.prototype.onSearch = function (query) {
                };
                return AboutPanel;
            })();
            Panels.AboutPanel = AboutPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
