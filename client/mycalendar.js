/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>
// Start the script when the page is ready.
$(function () {
    var userButton = $('#user-settings-button');
    var mainMenu = $('#main-menu');

    userButton.click(function (event) {
        var state = userButton.attr('selected');

        if (typeof state === 'undefined' || (state) === false) {
            userButton.attr('selected', true);
            mainMenu.show().animate({ width: 240 }, 200, function () {
                mainMenu.children('.hidable-menu').show();
            });
        } else {
            mainMenu.children('.hidable-menu').hide();
            mainMenu.show().animate({ width: 80 }, 200, function () {
                userButton.removeAttr('selected');
            });
        }

        console.log("type: ");
    });

    MyCalendar.calendarsRepository.create({ name: 'test', events: [] }).done(function (myCalendar) {
        console.log(myCalendar.getRefId());
        myCalendar.name = 'yo';
        MyCalendar.calendarsRepository.save(myCalendar).done(function () {
            MyCalendar.calendarsRepository.findById(myCalendar.getRefId()).done(function (myCalendar2) {
                console.log(myCalendar2.name);
            });
        });

        MyCalendar.calendarsRepository.find({}).done(function (calendars) {
            calendars.map(function (value, index, array) {
                console.log(value.getRefId());
                MyCalendar.calendarsRepository.delete(value);
            });
        });

        MyCalendar.calendarsRepository.find({}).done(function (calendars) {
            calendars.map(function (value, index, array) {
                console.log(value.getRefId());
            });
        });
    });
});
