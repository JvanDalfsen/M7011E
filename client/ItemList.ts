class ItemList {
    
	items: Array<Item>;

	constructor(items: any[]) {
        this.items = items;
	}

	addItem(item: Item){
		this.items[this.items.length] = item;
	}
}