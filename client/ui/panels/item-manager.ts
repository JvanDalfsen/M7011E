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
				var event = new MyCalendar.Models.Event();
				event.name = $('title').val();
				event.description = $('description').val();
				event.location = $('location').val();
				event.begin = $('fromDate').datepicker('getDate');
				event.end = $('toDate').datepicker('getDate');

				var calendarName = $('calendar').val();
				var calendar = 9;//something with calendarName;

				//show previous panel
			});


			//click function for the 'calendar' button
			$("#calendar-button").click(function () {
				//show calendar panel
			});

			//click function for the 'itemview' button
			$("#itemview-button").click(function () {
				//show itemview panel
			});

			//click function for datepicker
			$('.datepicker').datepicker({
				beforeShow: function (input, inst) {
					// Handle calendar position before showing it.
					// It's not supported by Datepicker itself (for now) so we need to use its internal variables.
					var calendar = inst.dpDiv;

					// Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
					setTimeout(function () {
						calendar.position({
							my: 'left top',
							at: 'right top',
							collision: 'none'
						});
					}, 1);
				}
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