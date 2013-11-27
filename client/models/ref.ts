/// <reference path="../repository.ts"/>

module MyCalendar.Models {
    export class Ref<T> {
        constructor(private refid) {

        }

        public deference(): T {
            return <T>(Repository<T>.todo(this.refid));
        }
    }
}