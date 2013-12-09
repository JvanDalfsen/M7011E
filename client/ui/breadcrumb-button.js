var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/jquery.d.ts"/>
    /// <reference path="./idynamic-view.ts"/>
    /// <reference path="../definitions/handlebars.d.ts"/>
    (function (UI) {
        var BreadcrumbButton = (function () {
            function BreadcrumbButton(_name) {
                this._name = _name;
                this._view = $(Handlebars.templates['breadcrumb-button']({ title: this._name }));
            }
            BreadcrumbButton.prototype.onload = function () {
            };

            BreadcrumbButton.prototype.onremove = function () {
            };

            BreadcrumbButton.prototype.select = function (value) {
                if (value) {
                    this._view.children().attr('selected', value);
                } else {
                    this._view.children().removeAttr('selected');
                }
            };

            BreadcrumbButton.prototype.view = function () {
                return this._view;
            };
            return BreadcrumbButton;
        })();
        UI.BreadcrumbButton = BreadcrumbButton;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
