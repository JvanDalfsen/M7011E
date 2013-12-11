/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/fullCalendar.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/calendar-manager-toolbar.ts"/>
/// <reference path="./item-manager.ts"/>
/// <reference path="../../models/calendar.ts"/>

module MyCalendar.UI.Panels {
    export class CalendarManagerPanel implements IPanel {
        private _calendar: Models.Calendar;

        constructor(calendar: Models.Calendar) {
            this._calendar = calendar;
        }


        public onload(): void {
            var calendarEvents = [];
            var defArray: any = [];

            var eventRefs = this._calendar.events;

            for (var j = 0; j < eventRefs.length; j++) {
                var def = eventRefs[j].deference().then((dbEvent) => {
                    var calendarEvent = { title: dbEvent.name, start: dbEvent.begin, end: dbEvent.end, description: dbEvent.description, location: dbEvent.location, documents: dbEvent.documents, id: dbEvent.getRefId() };
                    calendarEvents.push(calendarEvent);
                });
                defArray.push(def);
            }



            $.when.apply($, defArray).done(() => {
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: false,
                    eventClick: (calEvent, jsEvent, view) => {
                        MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel(this._calendar, calEvent.id));
                    },
                    events: calendarEvents
                });
            });



            $("#add-button").click(() => {
                MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel(this._calendar));
            });
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['calendar-manager-panel']());
        }

        public name(): string {
            return 'Calendar: ' + this._calendar.name;
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