class Item {
    title: String;
	fromDate: String;
	fromTime: String;
	toDate: String;
	toTime: String;
    location: String;
	calendar: String;
	description: String;
	documents: Array<String>;

	constructor(title: String, fromDate: String, fromTime: String, toDate: String, toTime: String, location: String,
		calendar: String, description: String, documents: Array) {
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

	addDocument(document: String){
		this.documents[this.documents.length] = document;
	}
}