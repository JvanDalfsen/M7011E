/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>
/// <reference path="./definitions/jqueryui.d.ts"/>
/// <reference path="./definitions/fullCalendar.d.ts"/>
/// <reference path="LocationMenu.ts" />
/// <reference path="Item.ts" />
/// <reference path="ItemList.ts" />

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
    }); 

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // initiate fullcalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1),
                backgroundColor: 'blue'
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                backgroundColor: 'yellow'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                allDay: false,
                backgroundColor: 'red'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                allDay: false,
                backgroundColor: 'green'
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: 'grey'
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: 'orange'
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                backgroundColor: 'hsl(200, 90%, 38%)'
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/',
                backgroundColor: 'hsl(200, 90%, 38%)'
            }
        ]
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
        //TODO: save event to server
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