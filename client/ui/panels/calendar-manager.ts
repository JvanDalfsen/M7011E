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
            var calendarIDs = ["52a5fb7da68758c018000001"];
			var calendarEvents = [];

			for(var i = 0; i < calendarIDs.length; i++){
				MyCalendar.calendarsRepository.findById(calendarIDs[i]).done((calendar) => {
					var eventRefs = calendar.events;
                    console.log(eventRefs);
                    for (var j = 0; j < eventRefs.length; j++){
                        var dbEvent = eventRefs[j].deference();
                        console.log("event: "+dbEvent);
						var calendarEvent = {title: dbEvent.name, start: dbEvent.begin, end: dbEvent.end, description: dbEvent.description, location: dbEvent.location, documents: dbEvent.documents}
						calendarEvents[calendarEvents.length] = calendarEvent;
					}
				});
			}

			$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				editable: true,
				events: calendarEvents
            });

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