var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        /// <reference path="../../definitions/jquery.d.ts"/>
        /// <reference path="../../definitions/jqueryui.d.ts"/>
        /// <reference path="../../definitions/fullCalendar.d.ts"/>
        /// <reference path="../../definitions/handlebars.d.ts"/>
        /// <reference path="../../repository.ts"/>
        /// <reference path="./ipanel.ts"/>
        /// <reference path="./document-manager.ts"/>
        /// <reference path="../panel-host.ts"/>
        /// <reference path="../toolbars/item-manager-toolbar.ts"/>
        (function (Panels) {
            var ItemManagerPanel = (function () {
                function ItemManagerPanel(calendar, eventId) {
                    if (typeof eventId === "undefined") { eventId = null; }
                    ItemManagerPanel._currentEventId = eventId;
                    ItemManagerPanel._currentCalendar = calendar;
                }
                ItemManagerPanel.prototype.onload = function () {
                    if (ItemManagerPanel._currentEventId) {
                        this.loadEvent(ItemManagerPanel._currentEventId);
                    }
                    var that = this;

                    $('.datepicker').datepicker({ dateFormat: 'dd-mm-yy' });
                    $("#fromDate").datepicker("setDate", new Date());
                    $("#toDate").datepicker("setDate", new Date());

                    this._saveButton = $("#save-button");

                    this._saveButton.click(this.saveEvent);

                    //click function for the 'calendar' button
                    $("#calendar-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    });

                    $("#documents-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
                    });

                    if (ItemManagerPanel._currentEventId) {
                        $("#delete-button").click(this.removeEvent);
                    } else {
                        $("#delete-button").hide();
                    }
                };

                ItemManagerPanel.prototype.removeEvent = function () {
                    if (!ItemManagerPanel._currentEventId) {
                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    } else {
                        var keepedRefs = [];

                        for (var i = 0; i < ItemManagerPanel._currentCalendar.events.length; ++i) {
                            if (ItemManagerPanel._currentCalendar.events[i].id != ItemManagerPanel._currentEventId) {
                                keepedRefs.push(ItemManagerPanel._currentCalendar.events[i]);
                            }
                        }

                        ItemManagerPanel._currentCalendar.events = keepedRefs;

                        MyCalendar.calendarsRepository.save(ItemManagerPanel._currentCalendar).done(function () {
                            MyCalendar.eventsRepository.deleteById(ItemManagerPanel._currentEventId).done(function () {
                                MyCalendar.UI.PanelHost.getInstance().popPanel();
                            });
                        });
                    }
                };

                ItemManagerPanel.prototype.saveEvent = function () {
                    if (!ItemManagerPanel._currentEventId) {
                        var beginDate = $("#fromDate").datepicker("getDate");
                        beginDate.setDate(beginDate.getDate() + 1);
                        var startTime = $("#fromTime").val();
                        beginDate.setHours(startTime.substring(0, startTime.indexOf(":")));
                        beginDate.setHours(startTime.substring(startTime.indexOf(":") + 1, startTime.length));
                        var endDate = $("#toDate").datepicker("getDate");
                        endDate.setDate(endDate.getDate() + 1);
                        var endTime = $("#toTime").val();
                        endDate.setHours(endTime.substring(0, endTime.indexOf(":")));
                        endDate.setHours(endTime.substring(endTime.indexOf(":") + 1, endTime.length));

                        var newEvent = {};
                        newEvent.name = $('#title').val();
                        newEvent.description = $('#description').val();
                        newEvent.location = $('#location').val();
                        newEvent.begin = beginDate;
                        newEvent.end = endDate;
                        newEvent.documents = [];

                        MyCalendar.eventsRepository.create(newEvent).done(function (event) {
                            if (!ItemManagerPanel._currentCalendar.events) {
                                ItemManagerPanel._currentCalendar.events = [];
                            }

                            var eventrefid = event.getRefId();
                            var new_ref = new MyCalendar.Models.Ref(event.getRefId(), MyCalendar.eventsRepository);

                            ItemManagerPanel._currentCalendar.events.push(new_ref);

                            MyCalendar.calendarsRepository.save(ItemManagerPanel._currentCalendar).done(function () {
                                MyCalendar.UI.PanelHost.getInstance().popPanel();
                            });
                        });
                    } else {
                        var beginDate = $("#fromDate").datepicker("getDate");
                        beginDate.setDate(beginDate.getDate() + 1);
                        var startTime = $("#fromTime").val();
                        beginDate.setHours(startTime.substring(0, startTime.indexOf(":")));
                        beginDate.setHours(startTime.substring(startTime.indexOf(":") + 1, startTime.length));
                        var endDate = $("#toDate").datepicker("getDate");
                        endDate.setDate(endDate.getDate() + 1);
                        var endTime = $("#toTime").val();
                        endDate.setHours(endTime.substring(0, endTime.indexOf(":")));
                        endDate.setHours(endTime.substring(endTime.indexOf(":") + 1, endTime.length));

                        MyCalendar.eventsRepository.update(ItemManagerPanel._currentEventId, {
                            name: $('#title').val(),
                            description: $('#description').val(),
                            location: $('#location').val(),
                            begin: beginDate,
                            end: endDate
                        });

                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    }
                };

                ItemManagerPanel.prototype.loadEvent = function (refId) {
                    MyCalendar.eventsRepository.findById(refId).done(function (event) {
                        $('#title').val(event.name);
                        $('#description').val(event.description);
                        $('#location').val(event.location);
                        $('#fromTime').val(event.begin.getMinutes + ":" + event.begin.getHours());
                        $('#toTime').val(event.end.getMinutes + ":" + event.end.getHours());
                        $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });

                        var beginn = "" + (event.begin).getDate() + "-" + (event.begin).getMonth() + "-" + (event.begin).getFullYear();
                        var eindd = "" + (event.end).getDate() + "-" + (event.end).getMonth() + "-" + (event.end).getFullYear();
                        $("#fromDate").datepicker("setDate", beginn);
                        $("#toDate").datepicker("setDate", eindd);
                    });
                };

                ItemManagerPanel.prototype.onremove = function () {
                };

                ItemManagerPanel.prototype.view = function () {
                    return $(Handlebars.templates['item-manager-panel']());
                };

                ItemManagerPanel.prototype.name = function () {
                    return 'Item Manager';
                };

                ItemManagerPanel.prototype.toolbar = function () {
                    return new UI.Toolbars.ItemManagerToolbar();
                };

                ItemManagerPanel.prototype.searchEnable = function () {
                    return false;
                };

                ItemManagerPanel.prototype.onSearch = function (query) {
                    // TODO!
                };
                return ItemManagerPanel;
            })();
            Panels.ItemManagerPanel = ItemManagerPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
