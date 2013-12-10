/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/jqueryui.d.ts"/>
/// <reference path="../../definitions/fullCalendar.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/item-manager-toolbar.ts"/>

module MyCalendar.UI.Panels {
    export class ItemManagerPanel implements IPanel {

        public onload(): void {
			// click function for the 'Save' button
			$(".save-button").click(function () {
                /*var newEvent = new MyCalendar.Models.Event();
                newEvent.name = $('#title').val();
                console.log(newEvent.name);
                newEvent.description = $('#description').val();
                console.log(newEvent.description);
                newEvent.location = $('#location').val();
                console.log(newEvent.location);
                newEvent.begin = $("#fromDate").datepicker("getDate");
                console.log(newEvent.begin);
                newEvent.end = $("#toDate").datepicker("getDate");
                console.log(newEvent.end);
                newEvent.documents = [];*/
                var newEvent = {
                    name: $('#title').val(),
                    description: $('#description').val(),
                    location: $('#location').val(),
                    begin: $("#fromDate").datepicker("getDate"),
                    end: $("#toDate").datepicker("getDate"),
                    documents: []
                };
                console.log(newEvent);
                MyCalendar.eventsRepository.create(newEvent).done((event: MyCalendar.Models.Event) => {

                    MyCalendar.calendarsRepository.findById("52a78ff5b0a242501b000002").done((calendar) => {
                        if (!calendar.events) {
                            calendar.events = [];
                        }
                        var eventrefid = event.getRefId();
                        console.log(event);
                        var new_ref = new MyCalendar.Models.Ref<MyCalendar.Models.Event>(event.getRefId(), MyCalendar.eventsRepository);
                        console.log(new_ref);
                        calendar.events.push(new_ref);
                        console.log(calendar.events);
                        MyCalendar.calendarsRepository.save(calendar).done((calendar2) => {
                            MyCalendar.calendarsRepository.findById("52a78ff5b0a242501b000002").done((calendar3) => {
                                console.log(calendar3.events);
                            });
                        });
                    });
                });
				
				//show previous panel
                MyCalendar.UI.PanelHost.getInstance().popPanel();
            });


			//click function for the 'calendar' button
			$("#calendar-button").click(function () {
                MyCalendar.UI.PanelHost.getInstance().popPanel();
			});

            //click function for datepicker
            $('.datepicker').datepicker({ dateFormat: 'dd-mm-yy' });//{
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