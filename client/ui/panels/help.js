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
            var HelpPanel = (function () {
                function HelpPanel() {
                }
                HelpPanel.prototype.onload = function () {
                };

                HelpPanel.prototype.onremove = function () {
                };

                HelpPanel.prototype.view = function () {
                    return $(Handlebars.templates['help-panel']());
                };

                HelpPanel.prototype.name = function () {
                    return 'Help';
                };

                HelpPanel.prototype.toolbar = function () {
                    return null;
                };

                HelpPanel.prototype.searchEnable = function () {
                    return false;
                };

                HelpPanel.prototype.onSearch = function (query) {
                };
                return HelpPanel;
            })();
            Panels.HelpPanel = HelpPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
