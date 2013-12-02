/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>

// Start the script when the page is ready.
$(() => {
    var userButton = $('#user-settings-button');
    var mainMenu   = $('#main-menu');

    userButton.click((event: JQueryEventObject) => {
        var state: any = userButton.attr('selected');

        if (typeof state === 'undefined' || <boolean>(state) === false) {
            userButton.attr('selected', true);
            mainMenu.show().animate({ width: 240 }, 200, () => {
                mainMenu.children('.hidable-menu').show();
            });
        } else {            
            mainMenu.children('.hidable-menu').hide();
            mainMenu.show().animate({ width: 80 }, 200, () => {
                userButton.removeAttr('selected');
            });
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
});