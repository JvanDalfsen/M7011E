class ItemList {
    
	items: Array<Item>;

	constructor(items: Array) {
        this.items = items;
	}

	addItem(item: Item){
		this.items[this.items.length] = item;
	}
}