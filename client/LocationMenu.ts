/// <reference path="./definitions/jquery.d.ts"/>

class LocationMenu {
    id: string;
    constructor(id: string) {
        this.id = id;
    }

    addMenuOption(menuText: string) {
        //$('<li>....');
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        $(link).addClass("dark-blue-button breadcrumb-button")
            .html(menuText);
        $(listItem).append($(link));

        

        var temp = $(this.id).children().eq(0);
        temp.children().eq(0).append($(listItem));

       
    }

}

