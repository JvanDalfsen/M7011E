/// <reference path="./definitions/jquery.d.ts"/>

/// <reference path="./models/model.ts"/>
/// <reference path="./models/calendar.ts"/>
/// <reference path="./models/event.ts"/>

module MyCalendar {
    export class Repository<T extends Models.Model> {
        public static ApiRoot = '/api';

        private _dummie: T;

        constructor(private _cstr: any) {
            // _cstr: A trick to call the right constructor.
            // http://stackoverflow.com/questions/17382143/how-to-create-a-new-object-from-type-parameter-in-generic-class-in-typescript

            // This way we can compare the type of a dummy with instanceof.
            this._dummie = new this._cstr();
        }

        public create(value: any): JQueryPromise<T> {
            return this.callAPI('POST', '', value).then((json: any): any => {
                return this.buildModel(json);
            });
        }

        public find(query: any): JQueryPromise<T> {
            return this.callAPI('GET', '', query).then((json: Array<any>): any => {
                return json.map((result, index, array): any => {
                    return this.buildModel(result);
                });
            });
        }

        public findById(id: string): JQueryPromise<T> {
            return this.callAPI('GET', '/' + id).then((json: any): any => {
                return this.buildModel(json);
            });
        }

        public update(id: string, value: any): JQueryPromise<T> {
            return this.callAPI('PUT', '/' + id, value).then((json: any): any => {
                return this.buildModel(json);
            });
        }

        
        public save(obj: T): JQueryPromise<T> {
            if (this.isCalendar()) {
                // Transform the ref into strings.
                (<any>obj).events = (<Models.Calendar><any>obj).events.map(this.extractRef);                
            }

            if (this.isEvent()) {
                // Transform the ref into strings.
                (<any>obj).documents = (<Models.Event><any>obj).documents.map(this.extractRef);
            }

            return this.callAPI('PUT', '/' + obj.getRefId(), obj).then((json: any): any => {
                var value = this.buildModel(json);

                for (var prop in value) {
                    // Update the _id of the object. 
                    obj[prop] = value[prop];
                }

                return obj;
            });
        }

        public delete(obj: any): JQueryPromise<T> {
            return this.deleteById(obj.getRefId());
        }

        public deleteById(id: string): JQueryPromise<T> {
            return this.callAPI('DELETE', '/' + id).then((json: any): any => {
                return this.buildModel(json);
            });
        }

        private buildModel(json: any): any {
            if (this.isCalendar()) {
                var calendar: Models.Calendar = new Models.Calendar();
                calendar._id  = json._id;
                calendar.name = json.name;

                // Copy the references.
                var events: Array<string> = <Array<string>>json.events;

                calendar.events = events.map((value: string, index: number, array: Array<string>): Models.Ref<Models.Event> => {
                    return new Models.Ref<Models.Event>(value, eventsRepository);
                });

                return <T><any>calendar;

            } else if (this.isDocument()) {
                var document: Models.Document = new Models.Document(); 
                
                // Raw copy of the json.
                for (var prop in json) {
                    document[prop] = json[prop];
                }

                return <T><any>document;
            } else if (this.isEvent()) {
                var event: Models.Event = new Models.Event();
                event._id         = json._id;
                event.begin       = json.being;
                event.end         = json.end;
                event.name        = json.name;
                event.description = json.description;

                // Copy the references.
                var documents: Array<string> = <Array<string>>json.documents;

                event.documents = documents.map((value: string, index: number, array: Array<string>): Models.Ref<Models.Document> => {
                    return new Models.Ref<Models.Document>(value, documentsRepository);
                });

               return <T><any>event;
            }

            return null;
        }

        public getRoute(): string {
            if (this.isCalendar()) {
                return '/calendars';
            } else if (this.isEvent()) {
                return '/events';
            } else if (this.isDocument()) {
                return '/documents';
            }

            throw 'no route avaiblable for this type';

            return null;
        }

        private callAPI(type: string, url: string = '', data: any = {}): JQueryPromise<any> {
            return $.ajax({
                type: type,
                url: Repository.ApiRoot + this.getRoute() + url,
                data: data,
                dataType: 'json',
                success: (json, textStatus, jqXHR) => {
                    return json;
                }
            });
        }

        private isCalendar(): boolean {
            return this._dummie instanceof Models.Calendar;
        }

        private isEvent(): boolean {
            return this._dummie instanceof Models.Event;
        }

        private isDocument(): Boolean {
            return this._dummie instanceof Models.Document;
        }

        private extractRef<T extends Models.Model>(value: Models.Ref<T>, index: number, array: Array<Models.Ref<T>>): string {
            return value.id;
        }
    }

    export var eventsRepository    = new Repository<Models.Event>(Models.Event);
    export var calendarsRepository = new Repository<Models.Calendar>(Models.Calendar);
    export var documentsRepository = new Repository<Models.Document>(Models.Document);
}