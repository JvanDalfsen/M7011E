/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/jqueryui.d.ts"/>
/// <reference path="../../definitions/fullCalendar.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="./document-manager.ts"/>
/// <reference path="../panel-host.ts"/>
/// <reference path="../toolbars/item-manager-toolbar.ts"/>

module MyCalendar.UI.Panels {
    export class ItemManagerPanel implements IPanel {
        private currentEventId: string;
        private calendarId: string;

        constructor(eventId: string = null, calendarId:string = null) {
            this.currentEventId = eventId;
            this.calendarId = calendarId;
        }

        public onload(): void {
            // click function for the 'Save' button

            if (this.currentEventId) {
                this.loadEvent(this.currentEventId, this.calendarId);
            }

            $('.datepicker').datepicker({ dateFormat: 'dd-mm-yy' });
            $("#fromDate").datepicker("setDate", new Date());
            $("#toDate").datepicker("setDate", new Date());

			$("#save-button").click(() => {
                if ($("#new-event").val() == "1") {
                    console.log("new event");
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

                    var newEvent = {
                        name: $('#title').val(),
                        description: $('#description').val(),
                        location: $('#location').val(),
                        begin: beginDate,
                        end: endDate,
                        documents: []
                    };
                    MyCalendar.eventsRepository.create(newEvent).done((event: MyCalendar.Models.Event) => {

                        MyCalendar.calendarsRepository.findById("52a78ff5b0a242501b000002").done((calendar) => {
                            if (!calendar.events) {
                                calendar.events = [];
                            }
                            var eventrefid = event.getRefId();
                            var new_ref = new MyCalendar.Models.Ref<MyCalendar.Models.Event>(event.getRefId(), MyCalendar.eventsRepository);
                            calendar.events.push(new_ref);
                            MyCalendar.calendarsRepository.save(calendar).done();
                        });
                    });
                } else {
                    console.log("existing event");
                    var beginDate = $("#fromDate").datepicker("getDate");
                    console.log(beginDate);
                    beginDate.setDate(beginDate.getDate() + 1);
                    var startTime = $("#fromTime").val();
                    beginDate.setHours(startTime.substring(0, startTime.indexOf(":")));
                    beginDate.setHours(startTime.substring(startTime.indexOf(":") + 1, startTime.length));
                    console.log(beginDate);
                    var endDate = $("#toDate").datepicker("getDate");
                    endDate.setDate(endDate.getDate() + 1);
                    var endTime = $("#toTime").val();
                    endDate.setHours(endTime.substring(0, endTime.indexOf(":")));
                    endDate.setHours(endTime.substring(endTime.indexOf(":") + 1, endTime.length));

                    MyCalendar.eventsRepository.update(this.currentEventId, {
                        name: $('#title').val(),
                        description: $('#description').val(),
                        location: $('#location').val(),
                        begin: beginDate,
                        end: endDate
                    });
                }
				MyCalendar.UI.PanelHost.getInstance().popPanel();
            });


			//click function for the 'calendar' button
			$("#calendar-button").click(function () {
                MyCalendar.UI.PanelHost.getInstance().popPanel();
            });

            $("#documents-button").click(function () {
                MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
            });

            $("#delete-button").click(function () {
                if ($("#new-event").val() == "1") {
                    MyCalendar.UI.PanelHost.getInstance().popPanel();
                } else {
                    console.log($("#new-event").val());
                    MyCalendar.eventsRepository.deleteById($("#new-event").val());
                    MyCalendar.calendarsRepository.findById($("#calendar-id").val()).done((cal) => {
                        var index;
                        for (var i = 0; i < cal.events.length; i++) {
                            cal.events[i].deference().done((ev) => {
                                if (ev.getRefId() == $("#new-event").val()) {
                                    index = i;
                                }
                            });
                        }
                        cal.events.splice(index, 1);
                        MyCalendar.calendarsRepository.save(cal);
                    });
                    MyCalendar.UI.PanelHost.getInstance().popPanel();
                }
            });

            //click function for datepicker
            //{
				//clickInput: true
                //doesnt work:
                /*beforeShow: function (input, inst) {
					// Handle calendar position before showing it.
					// It's not supported by Datepicker itself (for now) so we need to use its internal variables.
					var calendar = inst.dpDiv;

					// Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
					setTimeout(function () {
						calendar.position({
							my: 'left top',
							at: 'left bottom',
							collision: 'none'
						});
					}, 1);
				}*/
			//});
        }

        public loadEvent(refId: string, calendarId: string): void {
            MyCalendar.eventsRepository.findById(refId).done((event:MyCalendar.Models.Event) => {           
                $('#title').val(event.name);
                $('#description').val(event.description);
                $('#location').val(event.location);
                //$('#fromTime').val(event.begin.getMinutes + ":" + event.begin.getHours());
                //$('#toTime').val(event.end.getMinutes + ":" + event.end.getHours());
                console.log(event.begin);
                console.log(event.end);
                $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });
                console.log(event.begin);
                console.log(event.end);
                //var beginn = "" + (<Date>event.begin).getDate() + "-" + (<Date>event.begin).getMonth() + "-" + (<Date>event.begin).getFullYear();
                //var eindd = "" + (<Date>event.end).getDate() + "-" + (<Date>event.end).getMonth() + "-" + (<Date>event.end).getFullYear();
                //$("#fromDate").datepicker("setDate", beginn);
                //$("#toDate").datepicker("setDate", eindd);
                $("#new-event").val(refId);
                $("#calendar-id").val(calendarId);
                console.log(refId);
                console.log(calendarId);
            });
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['item-manager-panel']());
        }

        public name(): string {
            return 'Item Manager';
        }

        public toolbar(): Toolbars.IToolbar {
            return new Toolbars.ItemManagerToolbar();
        }

        public searchEnable(): boolean {
            return false;
        }

        public onSearch(query: string): void {
            // TODO!
        }
    }
}