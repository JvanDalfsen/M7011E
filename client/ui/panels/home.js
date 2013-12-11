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
            var HomePanel = (function () {
                function HomePanel() {
                }
                HomePanel.prototype.onload = function () {
                    var _this = this;
                    this._panel = $('#home-panel');

                    if (MyCalendar.Models.currentUser) {
                        this._createCalendarButton = $('#create-calendar');
                        this._createCalendarButton.click(function () {
                            MyCalendar.calendarsRepository.create({ name: "new calendar", events: [] }).done(function () {
                                _this.updateCalendarList();
                            });
                        });

                        this.updateCalendarList();
                    }
                };

                HomePanel.prototype.onremove = function () {
                };

                HomePanel.prototype.view = function () {
                    if (MyCalendar.Models.currentUser) {
                        return $(Handlebars.templates['home-panel']());
                    } else {
                        return $(Handlebars.templates['offline-home-panel']());
                    }
                };

                HomePanel.prototype.name = function () {
                    return 'Home';
                };

                HomePanel.prototype.toolbar = function () {
                    if (MyCalendar.Models.currentUser) {
                        return new UI.Toolbars.HomeToolbar();
                    } else {
                        return null;
                    }
                };

                HomePanel.prototype.searchEnable = function () {
                    if (MyCalendar.Models.currentUser) {
                        return true;
                    } else {
                        return false;
                    }
                };

                HomePanel.prototype.onSearch = function (query) {
                    if (MyCalendar.Models.currentUser) {
                        this.updateCalendarList(query);
                    }
                };

                HomePanel.prototype.updateCalendarList = function (query) {
                    var _this = this;
                    MyCalendar.calendarsRepository.find({}).done(function (calendars) {
                        _this._panel.find('.remote-calendar').remove();
                        calendars.forEach(function (calendar) {
                            if (query) {
                                if (calendar.name.toUpperCase().indexOf(query.toUpperCase()) == -1) {
                                    return;
                                }
                            }

                            var params = calendar;
                            params.events_count = calendar.events.length;

                            var calendarItem = $(Handlebars.templates['calendar-item'](params));
                            _this._panel.append(calendarItem);

                            calendarItem.find('.delete-document').click(function (ev) {
                                ev.stopPropagation();
                                ev.preventDefault();
                                MyCalendar.calendarsRepository.deleteById(calendar.getRefId()).done(function () {
                                    _this.updateCalendarList();
                                });
                            });

                            calendarItem.find('.calendar-name').on('input', function (ev) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                MyCalendar.calendarsRepository.update(calendar.getRefId(), { name: calendarItem.find('.calendar-name').val() });
                            });

                            calendarItem.find('.calendar-name').click(function (ev) {
                                ev.stopPropagation();
                            });

                            calendarItem.click(function () {
                                UI.PanelHost.getInstance().pushPanel(new UI.Panels.CalendarManagerPanel(calendar));
                            });
                        });
                    });
                };
                return HomePanel;
            })();
            Panels.HomePanel = HomePanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
