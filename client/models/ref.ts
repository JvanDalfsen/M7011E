/// <reference path="./model.ts"/>
/// <reference path="../repository.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>

module MyCalendar.Models {
    export class Ref<T extends Model> {
        constructor(private _refid: string, private _repo: Repository<T>) {

        }

        public get id(): string {
            return this._refid;
        }

        public deference(): JQueryPromise<T> {
            return this._repo.findById(this._refid);
        }
    }
}