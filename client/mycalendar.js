/// <reference path="./definitions/jquery.d.ts"/>
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
    });
});
