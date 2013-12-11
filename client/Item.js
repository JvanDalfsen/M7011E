var Item = (function () {
    function Item(title, fromDate, fromTime, toDate, toTime, location, calendar, description, documents) {
        this.title = title;
        this.fromDate = fromDate;
        this.fromTime = fromTime;
        this.toDate = toDate;
        this.toTime = toTime;
        this.location = location;
        this.calendar = calendar;
        this.description = description;
        this.documents = documents;
    }
    Item.prototype.addDocument = function (document) {
        this.documents[this.documents.length] = document;
    };
    return Item;
})();
