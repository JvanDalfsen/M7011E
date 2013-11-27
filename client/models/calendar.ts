/// <reference path="./imodel.ts"/>
/// <reference path="./ref.ts"/>
/// <reference path="./event.ts"/>

module MyCalendar.Models {
    export class Calendar implements IModel {
        public _id:  any;
        public name: string;
        public events: Array<Ref<Event>>;

        public populate(): void {

        }
    }
}