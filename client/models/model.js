var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Model = (function () {
            function Model() {
            }
            Model.prototype.getRefId = function () {
                return this._id;
            };
            return Model;
        })();
        Models.Model = Model;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
