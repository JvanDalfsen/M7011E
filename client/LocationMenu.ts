/// <reference path="./definitions/jquery.d.ts"/>

class LocationMenu {
    constructor() {}

    addMenuOption(menuText: string) {
        $("#location-menu [selected]").removeAttr("selected");
        var listItem = $('<li><a class="dark-blue-button breadcrumb-button" selected> ' + menuText + ' </a></li>');
        $("#location-menu").children().eq(0).children().eq(0).append($(listItem));
        $(".breadcrumb-button").click(function () {
            $(this).parent().nextAll().remove();
            $(this).attr("selected", true);
        });
    }
}