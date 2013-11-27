var MyCalendar;
(function (MyCalendar) {
    /// <reference path="./imodel.ts"/>
    /// <reference path="./ref.ts"/>
    /// <reference path="./event.ts"/>
    (function (Models) {
        var Calendar = (function () {
            function Calendar() {
            }
            Calendar.prototype.populate = function () {
            };
            return Calendar;
        })();
        Models.Calendar = Calendar;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
