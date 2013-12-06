/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>
/// <reference path="./definitions/jqueryui.d.ts"/>
/// <reference path="./definitions/fullCalendar.d.ts"/>
/// <reference path="LocationMenu.ts" />
/// <reference path="Item.ts" />
/// <reference path="ItemList.ts" />
/// <reference path="repository.ts" />

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
        event.end         = new Date(2014, 1, 2);

        MyCalendar.eventsRepository.save(event).done((event: MyCalendar.Models.Event) => {
            var calendar = new MyCalendar.Models.Calendar();

            calendar.name = 'test';
            calendar.events = [new MyCalendar.Models.Ref<MyCalendar.Models.Event>(event.getRefId(), MyCalendar.eventsRepository)];

            MyCalendar.calendarsRepository.save(calendar).done((calendar) => {
                console.log('saved!');
            });
        });
    });

    var shown_events = [];
    var userCalendarIDs = [];
    for (var i = 0; i < userCalendarIDs.length; i++) {
        MyCalendar.calendarsRepository.findById(userCalendarIDs[i]).done((calendar) => {
            var eventRefs = calendar.events;
            for (var j = 0; j < eventRefs.length; j++) {
                eventRefs[0].deference().done((event) => {
                    shown_events[shown_events.length] = event;
                });
            }
        });
    }         


    // initiate fullcalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: shown_events
    });


    // click function for the 'My Calendar' button
    $(".breadcrumb-button").click(function () {
        $(this).parent().nextAll().remove();
        $(this).attr("selected", true);
    });

    // click function for events in itemlist-view
    $(".event-item").click(function () {
        window.location.assign("./Item.html");
        //TODO: fix this
        new LocationMenu().addMenuOption("Item");
    });

    // click function for the 'Save' button
    $(".save-button").click(function () {
        var event = new MyCalendar.Models.Event();
        event.name = $('title').val();
        event.description = $('description').val();
        event.location = $('location').val();
        event.begin = $('fromDate').datepicker('getDate');
        event.end = $('toDate').datepicker('getDate');

        var calendarName = $('calendar').val();
        
        var calendar = //something with calendarName;

        window.location.assign("./index.html");
    });

    //click function for the 'add' button
    $("#add-button").click(function () {
        window.location.assign("./Item.html");
    });

    //click function for the 'calendar' button
    $("#calendar-button").click(function () {
        window.location.assign("./calendar.html");
    });

    //click function for the 'itemview' button
    $("#itemview-button").click(function () {
        window.location.assign("./index.html");
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

    window.resizeBy(1,1);
});

function klickklick() {
    var l = new LocationMenu();
    l.addMenuOption("hallo");
    console.log("added")
}