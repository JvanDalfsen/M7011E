var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyCalendar;
(function (MyCalendar) {
    /// <reference path="./ref.ts"/>
    /// <reference path="./event.ts"/>
    (function (Models) {
        var Calendar = (function (_super) {
            __extends(Calendar, _super);
            function Calendar() {
                _super.apply(this, arguments);
            }
            return Calendar;
        })(Models.Model);
        Models.Calendar = Calendar;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
