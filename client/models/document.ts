module MyCalendar.Models {
    export class Document extends Model {
        public name:        string;
        public type:        string;

        public getURI(): string {
            return '/documents/download/' + this.getRefId();
        }
    }
}