/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/home-toolbar.ts"/>
/// <reference path="../../models/user.ts"/>
/// <reference path="../panel-host.ts"/>
/// <reference path="../panels/calendar-manager.ts"/>

module MyCalendar.UI.Panels {
    export class HomePanel implements IPanel {
        private _uploadArea: JQuery;
        private _createCalendarButton: JQuery;
        private _panel: JQuery;


        public onload(): void {
            this._panel = $('#home-panel');

            if (Models.currentUser) {
                this._createCalendarButton = $('#create-calendar');
                this._createCalendarButton.click(() => {
                    MyCalendar.calendarsRepository.create({ name: "new calendar", events: [] }).done(() => {
                        this.updateCalendarList();
                    });
                });

                this.updateCalendarList();
            }
        }

        public onremove(): void {

        }

        public view(): JQuery {
            if (Models.currentUser) {
                return $(Handlebars.templates['home-panel']());
            } else {
                return $(Handlebars.templates['offline-home-panel']());
            }
        }

        public name(): string {
            return 'Home';
        }

        public toolbar(): Toolbars.IToolbar {
            if (MyCalendar.Models.currentUser) {
                return new Toolbars.HomeToolbar();
            } else {
                return null;
            }
        }

        public searchEnable(): boolean {
            if (MyCalendar.Models.currentUser) {
                return true;
            } else {
                return false;
            }
        }

        public onSearch(query: string): void {
            if (Models.currentUser) {
                this.updateCalendarList(query);
            }
        }

        private updateCalendarList(query?: string): void {
            calendarsRepository.find({}).done((calendars: Array<Models.Calendar>): void => {
                this._panel.find('.remote-calendar').remove();
                calendars.forEach((calendar: Models.Calendar) => {

                    // If the filter is applied.
                    if (query) {
                        if (calendar.name.toUpperCase().indexOf(query.toUpperCase()) == -1) {
                            return;
                        }
                    }

                    var params: any = calendar;
                    params.events_count = calendar.events.length;

                    var calendarItem = $(Handlebars.templates['calendar-item'](params));
                    this._panel.append(calendarItem);

                    calendarItem.find('.delete-document').click((ev: JQueryEventObject) => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        calendarsRepository.deleteById(calendar.getRefId()).done(() => {
                            this.updateCalendarList();
                        });
                    });

                    calendarItem.find('.calendar-name').on('input', (ev: JQueryEventObject) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        calendarsRepository.update(calendar.getRefId(), { name: calendarItem.find('.calendar-name').val() }).done((json) => {
                            calendar.name = json.name;
                        });                        
                    });

                    calendarItem.find('.calendar-name').click((ev: JQueryEventObject) => {
                        ev.stopPropagation();
                    });

                    calendarItem.click(() => {
                        PanelHost.getInstance().pushPanel(new Panels.CalendarManagerPanel(calendar));
                    });
                });
            });
        }
    }
}