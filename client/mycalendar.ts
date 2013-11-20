/// <reference path="./definitions/jquery.d.ts"/>

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
    });
});