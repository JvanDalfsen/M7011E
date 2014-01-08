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
        public static _currentEventId: string;
        public static _currentCalendar: Models.Calendar;

        private _saveButton: JQuery;

        constructor(calendar: Models.Calendar, eventId: string = null) {
            ItemManagerPanel._currentEventId = eventId;
            ItemManagerPanel._currentCalendar = calendar;
        }

        public onload(): void {
            // click function for the 'Save' button

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
            $("#calendar-button").click(() => {
                MyCalendar.UI.PanelHost.getInstance().popPanel();
            });

            $("#documents-button").click(() => {
                MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel(ItemManagerPanel._currentEventId));
            });

            if (ItemManagerPanel._currentEventId) {
                $("#delete-button").click(this.removeEvent);
            } else {
                $("#delete-button").hide();
            }
        }

        private removeEvent(): void {
            if (!ItemManagerPanel._currentEventId) {
                MyCalendar.UI.PanelHost.getInstance().popPanel();
            } else {
                var keepedRefs: any = [];

                // Keeps all ref except the one we want to delete !
                for (var i = 0; i < ItemManagerPanel._currentCalendar.events.length; ++i) {
                    if (ItemManagerPanel._currentCalendar.events[i].id != ItemManagerPanel._currentEventId) {
                        keepedRefs.push(ItemManagerPanel._currentCalendar.events[i]);
                    }
                }

                ItemManagerPanel._currentCalendar.events = <Array<Models.Ref<Models.Event>>>keepedRefs;

                MyCalendar.calendarsRepository.save(ItemManagerPanel._currentCalendar).done(() => {
                    MyCalendar.eventsRepository.deleteById(ItemManagerPanel._currentEventId).done(() => {
                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    });
                }); 
            }
        }

        private saveEvent(): void {
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

                var newEvent: any = {};
                newEvent.name = $('#title').val();
                newEvent.description = $('#description').val();
                newEvent.location = $('#location').val();
                newEvent.begin = beginDate;
                newEvent.end = endDate;
                newEvent.documents = [];

                if (DocumentManagerPanel.pickedDocumentIds != null) {
                    newEvent.documents = DocumentManagerPanel.pickedDocumentIds;
                    DocumentManagerPanel.pickedDocumentIds = null;
                }


                MyCalendar.eventsRepository.create(newEvent).done((event: MyCalendar.Models.Event) => {
                    if (!ItemManagerPanel._currentCalendar.events) {
                        ItemManagerPanel._currentCalendar.events = [];
                    }

                    var eventrefid = event.getRefId();
                    var new_ref = new MyCalendar.Models.Ref<MyCalendar.Models.Event>(event.getRefId(), MyCalendar.eventsRepository);

                    ItemManagerPanel._currentCalendar.events.push(new_ref);

                    MyCalendar.calendarsRepository.save(ItemManagerPanel._currentCalendar).done(() => {
                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    });
                });
            } else {

                var beginDate = $("#fromDate").datepicker("getDate");
                beginDate.setDate(beginDate.getDate() + 1);
                var startTime = $("#fromTime").val();
                beginDate.setHours(startTime.substring(0, startTime.indexOf(":")));
                beginDate.setMinutes(startTime.substring(startTime.indexOf(":") + 1, startTime.length));
                var endDate = $("#toDate").datepicker("getDate");
                endDate.setDate(endDate.getDate() + 1);
                var endTime = $("#toTime").val();
                endDate.setHours(endTime.substring(0, endTime.indexOf(":")));
                endDate.setMinutes(endTime.substring(endTime.indexOf(":") + 1, endTime.length));

                var update: any = {};
                update.name = $('#title').val();
                update.description = $('#description').val();
                update.location = $('#location').val();
                update.begin = beginDate;
                update.end   = endDate;


                if (DocumentManagerPanel.pickedDocumentIds != null) {
                    update.documents = DocumentManagerPanel.pickedDocumentIds;
                    DocumentManagerPanel.pickedDocumentIds = null;
                }


                MyCalendar.eventsRepository.update(ItemManagerPanel._currentEventId, update).done(() => {
                    MyCalendar.UI.PanelHost.getInstance().popPanel();
                });
            }
        }

        public loadEvent(refId: string): void {
            MyCalendar.eventsRepository.findById(refId).done((event: MyCalendar.Models.Event) => {
                $('#title').val(event.name);
                $('#description').val(event.description);
                $('#location').val(event.location);
                $('#fromTime').val(event.begin.getMinutes + ":" + event.begin.getHours);
                $('#toTime').val(event.end.getMinutes + ":" + event.end.getHours);
                $(".datepicker").datepicker({ dateFormat: 'dd-mm-yy' });

                var beginn = "" + (<Date>event.begin).getDate() + "-" + (<Date>event.begin).getMonth() + "-" + (<Date>event.begin).getFullYear();
                var eindd = "" + (<Date>event.end).getDate() + "-" + (<Date>event.end).getMonth() + "-" + (<Date>event.end).getFullYear();
                $("#fromDate").datepicker("setDate", beginn);
                $("#toDate").datepicker("setDate", eindd);
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