var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        /// <reference path="../../definitions/jquery.d.ts"/>
        /// <reference path="../../definitions/fullCalendar.d.ts"/>
        /// <reference path="../../definitions/handlebars.d.ts"/>
        /// <reference path="../../repository.ts"/>
        /// <reference path="./ipanel.ts"/>
        /// <reference path="../toolbars/calendar-manager-toolbar.ts"/>
        /// <reference path="./item-manager.ts"/>
        /// <reference path="../../models/calendar.ts"/>
        (function (Panels) {
            var CalendarManagerPanel = (function () {
                function CalendarManagerPanel(calendar) {
                    this._calendar = calendar;
                }
                CalendarManagerPanel.prototype.onload = function () {
                    var _this = this;
                    var calendarEvents = [];
                    var defArray = [];

                    var eventRefs = this._calendar.events;

                    for (var j = 0; j < eventRefs.length; j++) {
                        var def = eventRefs[j].deference().then(function (dbEvent) {
                            var calendarEvent = { title: dbEvent.name, start: dbEvent.begin, end: dbEvent.end, description: dbEvent.description, location: dbEvent.location, documents: dbEvent.documents, id: dbEvent.getRefId() };
                            calendarEvents.push(calendarEvent);
                        });
                        defArray.push(def);
                    }

                    $.when.apply($, defArray).done(function () {
                        $('#calendar').fullCalendar({
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
                            editable: false,
                            eventClick: function (calEvent, jsEvent, view) {
                                MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel(_this._calendar, calEvent.id));
                            },
                            events: calendarEvents
                        });
                    });

                    $("#add-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel(_this._calendar));
                    });
                };

                CalendarManagerPanel.prototype.onremove = function () {
                };

                CalendarManagerPanel.prototype.view = function () {
                    return $(Handlebars.templates['calendar-manager-panel']());
                };

                CalendarManagerPanel.prototype.name = function () {
                    return 'Calendar: ' + this._calendar.name;
                };

                CalendarManagerPanel.prototype.toolbar = function () {
                    return new UI.Toolbars.CalendarManagerToolbar();
                };

                CalendarManagerPanel.prototype.searchEnable = function () {
                    return false;
                };

                CalendarManagerPanel.prototype.onSearch = function (query) {
                    // TODO!
                };
                return CalendarManagerPanel;
            })();
            Panels.CalendarManagerPanel = CalendarManagerPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
