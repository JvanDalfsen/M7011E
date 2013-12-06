/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>
/// <reference path="./definitions/jqueryui.d.ts"/>
/// <reference path="./definitions/fullCalendar.d.ts"/>
/// <reference path="LocationMenu.ts" />
/// <reference path="Item.ts" />
/// <reference path="ItemList.ts" />
/// <reference path="./ui/panels/document-manager.ts"/>
/// <reference path="./ui/panel-host.ts"/>

// Start the script when the page is ready.
$(() => {
    var userButton = $('#user-settings-button');
    var mainMenu = $('#main-menu');

    // open and close the account-menu
    userButton.click((event: JQueryEventObject) => {
        var state: any = userButton.attr('selected');

        if (typeof state === 'undefined' || <boolean>(state) === false) {
            userButton.attr('selected', true);
            mainMenu.show().animate({ width: 240 }, 200, () => {
                mainMenu.children('.hidable-menu').show();
            });
            $('body').width($('body').width() - 100);
        } else {
            mainMenu.children('.hidable-menu').hide();
            mainMenu.show().animate({ width: 80 }, 200, () => {
                userButton.removeAttr('selected');
            });
            $('body').width($('body').width() + 100);
        }

        console.log("type: ");
    });

    // Database tests!
    MyCalendar.calendarsRepository.create({ name: 'test', events: [] }).done((myCalendar) =>
    {
        console.log(myCalendar.getRefId());
        myCalendar.name = 'yo';
        MyCalendar.calendarsRepository.save(myCalendar).done(() => {
            MyCalendar.calendarsRepository.findById(myCalendar.getRefId()).done((myCalendar2) => {
                console.log(myCalendar2.name);
            });
        });


        MyCalendar.calendarsRepository.find({}).done((calendars: Array<any>) => {
            calendars.map((value, index, array) => {
                console.log(value.getRefId());
                MyCalendar.calendarsRepository.delete(value);
            });
        });

        MyCalendar.calendarsRepository.find({}).done((calendars: Array<any>) => {
            calendars.map((value, index, array) => {
                console.log(value.getRefId());
            });
        });

        var event = new MyCalendar.Models.Event();
        event.name        = 'test';
        event.description = 'test';
        event.location    = 'test';
        event.begin       = new Date(2014, 1, 1);
        event.end = new Date(2014, 1, 2);
        event.documents = [];

        MyCalendar.eventsRepository.save(event).done((event: MyCalendar.Models.Event) => {
            var calendar = new MyCalendar.Models.Calendar();

            calendar.name = 'test';
            calendar.events = [new MyCalendar.Models.Ref<MyCalendar.Models.Event>(event.getRefId(), MyCalendar.eventsRepository)];

            MyCalendar.calendarsRepository.save(calendar).done((calendar) => {
                console.log('saved!');
            });
        });
    });
    
    MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
    MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
    MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
});