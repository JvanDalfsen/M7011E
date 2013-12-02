/// <reference path="./ref.ts"/>
/// <reference path="./event.ts"/>

module MyCalendar.Models {
    export class Calendar extends Model {
        public name: string;
        public events: Array<Ref<Event>>;
    }
}