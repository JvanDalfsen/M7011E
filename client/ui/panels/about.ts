/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/home-toolbar.ts"/>
/// <reference path="../../models/user.ts"/>
/// <reference path="../panel-host.ts"/>
/// <reference path="../panels/calendar-manager.ts"/>

module MyCalendar.UI.Panels {
    export class AboutPanel implements IPanel {
        public onload(): void {
        }

        public onremove(): void {

        }

        public view(): JQuery {
            return $(Handlebars.templates['about-panel']());
        }

        public name(): string {
            return 'About';
        }

        public toolbar(): Toolbars.IToolbar {
            return null;
        }

        public searchEnable(): boolean {
            return false;
        }

        public onSearch(query: string): void {            
        }
    }
}