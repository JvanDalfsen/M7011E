/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/fullCalendar.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/calendar-manager-toolbar.ts"/>
/// <reference path="./item-manager.ts"/>

module MyCalendar.UI.Panels {
    export class CalendarManagerPanel implements IPanel {

        public onload(): void {

            // get calendar ID's from user? 
            var calendarIDs = ["52a78ff5b0a242501b000002"];
            var defArray = [];

            var calendarEvents = [];
            
            for (var i = 0; i < calendarIDs.length; i++) {
                MyCalendar.calendarsRepository.findById(calendarIDs[i]).done((calendar) => {
                    var eventRefs = calendar.events;
                    console.log(eventRefs);

                    for (var j = 0; j < eventRefs.length; j++) {
                        var def = eventRefs[j].deference().then((dbEvent) => {
                            //console.log(dbEvent);
                            var calendarEvent = { title: dbEvent.name, start: dbEvent.begin, end: dbEvent.end, description: dbEvent.description, location: dbEvent.location, documents: dbEvent.documents, id: dbEvent.getRefId() };
                            //console.log(calendarEvent);
                            calendarEvents.push(calendarEvent);
                            //console.log(calendarEvents);
                        });

                        defArray.push(def);


                    }

                    console.log(calendarEvents);
                }).done(() => {


                        $.when.apply($, defArray).done(() => {
                            console.log(calendarEvents);
                            $('#calendar').fullCalendar({
                                header: {
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'month,agendaWeek,agendaDay'
                                },
                                editable: false,
                                eventClick: function (calEvent, jsEvent, view) {
                                    MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel(calEvent.id));
                                },
                                events: calendarEvents
                                /*: [
                                    {
                                        title: 'All Day Event',
                                        start: new Date(2013, 12, 1),
                                        id: "52a791baa31d03a416000014"
                                    },
                                    {
                                        title: 'Long Event',
                                        start: new Date(2013, 12, 2),
                                        end: new Date(2013, 12, 5),
                                        id: "52a7907fa31d03a416000004"
                                    }]*/
                            });


                        });
                    });
            }

            $("#add-button").click(function () {
                MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel());
            });
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['calendar-manager-panel']());
        }

        public name(): string {
            return 'Calendar Manager';
        }

        public toolbar(): Toolbars.IToolbar {
            return new Toolbars.CalendarManagerToolbar();
        }

        public searchEnable(): boolean {
            return false;
        }

        public onSearch(query: string): void {
            // TODO!
        }
    }
}