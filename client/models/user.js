var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyCalendar;
(function (MyCalendar) {
    /// <reference path="./ref.ts"/>
    /// <reference path="./calendar.ts"/>
    (function (Models) {
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                _super.apply(this, arguments);
            }
            return User;
        })(Models.Model);
        Models.User = User;

        Models.currentUser = null;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
