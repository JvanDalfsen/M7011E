/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./models/model.ts"/>
/// <reference path="./models/calendar.ts"/>
/// <reference path="./models/event.ts"/>
/// <reference path="./models/user.ts"/>
var MyCalendar;
(function (MyCalendar) {
    var Repository = (function () {
        function Repository(_cstr) {
            this._cstr = _cstr;
            // _cstr: A trick to call the right constructor.
            // http://stackoverflow.com/questions/17382143/how-to-create-a-new-object-from-type-parameter-in-generic-class-in-typescript
            // This way we can compare the type of a dummy with instanceof.
            this._dummie = new this._cstr();
        }
        Repository.prototype.create = function (value) {
            var _this = this;
            return this.callAPI('POST', '', value).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.find = function (query) {
            var _this = this;
            return this.callAPI('GET', '', query).then(function (json) {
                if (_this.isUser()) {
                    return _this.buildModel(json);
                } else {
                    return json.map(function (result, index, array) {
                        return _this.buildModel(result);
                    });
                }
            });
        };

        Repository.prototype.findById = function (id) {
            var _this = this;
            return this.callAPI('GET', '/' + id).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.update = function (id, value) {
            var _this = this;
            return this.callAPI('PUT', '/' + id, value).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.save = function (obj) {
            var _this = this;
            if (this.isCalendar()) {
                // Transform the ref into strings.
                (obj).events = (obj).events.map(this.extractRef);
            }

            if (this.isEvent()) {
                // Transform the ref into strings.
                (obj).documents = (obj).documents.map(this.extractRef);
            }

            if (this.isUser()) {
                // Transform the ref into strings.
                (obj).calendars = (obj).calendars.map(this.extractRef);
            }

            return this.callAPI('PUT', '/' + obj.getRefId(), obj).then(function (json) {
                var value = _this.buildModel(json);

                for (var prop in value) {
                    // Update the _id of the object.
                    obj[prop] = value[prop];
                }

                return obj;
            });
        };

        Repository.prototype.delete = function (obj) {
            return this.deleteById(obj.getRefId());
        };

        Repository.prototype.deleteById = function (id) {
            var _this = this;
            return this.callAPI('DELETE', '/' + id).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.buildModel = function (json) {
            if (this.isCalendar()) {
                var calendar = new MyCalendar.Models.Calendar();
                calendar._id = json._id;
                calendar.name = json.name;

                // Copy the references.
                var events = json.events;

                calendar.events = events.map(function (value, index, array) {
                    return new MyCalendar.Models.Ref(value, MyCalendar.eventsRepository);
                });

                return calendar;
            } else if (this.isDocument()) {
                var document = new MyCalendar.Models.Document();

                for (var prop in json) {
                    document[prop] = json[prop];
                }

                return document;
            } else if (this.isEvent()) {
                var event = new MyCalendar.Models.Event();
                event._id = json._id;
                event.begin = json.being;
                event.end = json.end;
                event.name = json.name;
                event.description = json.description;

                // Copy the references.
                var documents = json.documents;

                event.documents = documents.map(function (value, index, array) {
                    return new MyCalendar.Models.Ref(value, MyCalendar.documentsRepository);
                });

                return event;
            } else if (this.isUser()) {
                var user = new MyCalendar.Models.User();
                user._id = json._id;
                user.displayName = json.displayName;
                user.firstname = json.firstname;
                user.lastname = json.lastname;
                user.emails = json.emails;
                user.avatars = json.avatars;
                user.lastConnection = json.lastConnection;

                // Copy the references.
                var calendars = json.calendars;

                user.calendars = calendars.map(function (value, index, array) {
                    return new MyCalendar.Models.Ref(value, MyCalendar.calendarsRepository);
                });

                return user;
            }

            return null;
        };

        Repository.prototype.getRoute = function () {
            if (this.isCalendar()) {
                return '/calendars';
            } else if (this.isEvent()) {
                return '/events';
            } else if (this.isDocument()) {
                return '/documents';
            } else if (this.isUser()) {
                return '/auth';
            }

            throw 'no route avaiblable for this type';

            return null;
        };

        Repository.prototype.callAPI = function (type, url, data) {
            if (typeof url === "undefined") { url = ''; }
            if (typeof data === "undefined") { data = {}; }
            return $.ajax({
                type: type,
                url: Repository.ApiRoot + this.getRoute() + url,
                data: data,
                dataType: 'json',
                success: function (json, textStatus, jqXHR) {
                    return json;
                }
            });
        };

        Repository.prototype.isCalendar = function () {
            return this._dummie instanceof MyCalendar.Models.Calendar;
        };

        Repository.prototype.isEvent = function () {
            return this._dummie instanceof MyCalendar.Models.Event;
        };

        Repository.prototype.isDocument = function () {
            return this._dummie instanceof MyCalendar.Models.Document;
        };

        Repository.prototype.isUser = function () {
            return this._dummie instanceof MyCalendar.Models.User;
        };

        Repository.prototype.extractRef = function (value, index, array) {
            return value.id;
        };
        Repository.ApiRoot = '/api';
        return Repository;
    })();
    MyCalendar.Repository = Repository;

    MyCalendar.eventsRepository = new Repository(MyCalendar.Models.Event);
    MyCalendar.calendarsRepository = new Repository(MyCalendar.Models.Calendar);
    MyCalendar.documentsRepository = new Repository(MyCalendar.Models.Document);
    MyCalendar.usersRepository = new Repository(MyCalendar.Models.User);
})(MyCalendar || (MyCalendar = {}));
