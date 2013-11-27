/// <reference path="./definitions/jquery.d.ts"/>
var LocationMenu = (function () {
    function LocationMenu(id) {
        this.id = id;
    }
    LocationMenu.prototype.addMenuOption = function (menuText) {
        //$('<li>....');
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        $(link).addClass("dark-blue-button breadcrumb-button").html(menuText);
        $(listItem).append($(link));

        var temp = $(this.id).children().eq(0);
        temp.children().eq(0).append($(listItem));
    };
    return LocationMenu;
})();
