﻿
module MyCalendar.Models {
    export class Event extends Model {
        public name:        string;
        public description: string;
        public location:    string;
        public begin:       Date;
        public end:         Date;
    }
}