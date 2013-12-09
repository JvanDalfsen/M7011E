var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Document = (function (_super) {
            __extends(Document, _super);
            function Document() {
                _super.apply(this, arguments);
            }
            Document.prototype.getURI = function () {
                return '/documents/download/' + this.getRefId();
            };
            return Document;
        })(Models.Model);
        Models.Document = Document;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
