var MyCalendar;
(function (MyCalendar) {
    /// <reference path="./model.ts"/>
    /// <reference path="../repository.ts"/>
    /// <reference path="../definitions/jquery.d.ts"/>
    (function (Models) {
        var Ref = (function () {
            function Ref(_refid, _repo) {
                this._refid = _refid;
                this._repo = _repo;
            }
            Object.defineProperty(Ref.prototype, "id", {
                get: function () {
                    return this._refid;
                },
                enumerable: true,
                configurable: true
            });

            Ref.prototype.deference = function () {
                return this._repo.findById(this._refid);
            };
            return Ref;
        })();
        Models.Ref = Ref;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
