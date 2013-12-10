/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>
/// <reference path="./definitions/jqueryui.d.ts"/>
/// <reference path="./definitions/fullCalendar.d.ts"/>
/// <reference path="./ui/panels/document-manager.ts"/>
/// <reference path="./ui/panels/calendar-manager.ts"/>
/// <reference path="./ui/panel-host.ts"/>
/// <reference path="./ui/user-menu.ts"/>
// Start the script when the page is ready.
$(function () {
    // Just to trigger the attachEvent function.
    MyCalendar.UI.UserMenu.getInstance();

    MyCalendar.usersRepository.find({}).done(function (user) {
        MyCalendar.Models.currentUser = user;
        MyCalendar.UI.UserMenu.getInstance().loginState(user);
        MyCalendar.UI.UserMenu.getInstance().open();
    });

    // Database tests!
    /*MyCalendar.calendarsRepository.create({ name: 'test', events: [] }).done((myCalendar) =>
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
    });*/
    //create calendar
    /*MyCalendar.calendarsRepository.create({ name: 'universal_calendar', events: [] }).done((myCalendar2) => {
    console.log(myCalendar2.getRefId());
    });*/
    //delete all calendars except universal_calendar
    /*MyCalendar.calendarsRepository.find({}).done((calendars: Array<any>) => {
    calendars.map((value, index, array) => {
    if (value.getRefId() != "52a5fb7da68758c018000001") {
    console.log(value.getRefId());
    MyCalendar.calendarsRepository.delete(value);
    }
    });
    });
    */
    MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel(), function () {
        MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel(), function () {
            MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
        });
    });
    // MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.CalendarManagerPanel());
});
