/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="LocationMenu.ts" />
/// <reference path="Item.ts" />
/// <reference path="ItemList.ts" />
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
            $('body').width($('body').width() - 100);
        } else {
            mainMenu.children('.hidable-menu').hide();
            mainMenu.show().animate({ width: 80 }, 200, function () {
                userButton.removeAttr('selected');
            });
            $('body').width($('body').width() + 100);
        }
    });
});

function klickklick() {
    var l = new LocationMenu("#location-menu");
    l.addMenuOption("hallo");
    console.log("added");
}
