/// <reference path="./imodel.ts"/>

module MyCalendar.Models {
    export class Event implements IModel {
        public _id: any;
        public name:        string;
        public description: string;
        public begin:       Date;
        public end:         Date;

        public populate(): void {

        }
    }
}