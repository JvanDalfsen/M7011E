/// <reference path="./ref.ts"/>
/// <reference path="./calendar.ts"/>

module MyCalendar.Models {
    export class User extends Model {
        public displayName: string;
        public firstname: string;
        public lastname: string;
        public emails: Array<{ value: string; type: string}>;
        public avatars: Array<string>;
        public lastConnection: Date;
        public calendars: Array<Ref<Calendar>>;
    }

    export var currentUser = null;
}