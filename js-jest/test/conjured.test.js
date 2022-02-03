const ConjuredItem = require("../src/conjured")

describe("ConjuredItem class", ()=>{
	let conjuredItem;
	beforeEach(()=>{
		conjuredItem = new ConjuredItem("Conjured Mana Cake", 20, 20);
	})

	it("creates an instance of itself", ()=>{
		expect(conjuredItem).toBeInstanceOf(ConjuredItem)
	})

	it("ConjuredItem class instances have several attributes", ()=>{
		expect(conjuredItem.name).toEqual('Conjured Mana Cake');
		expect(conjuredItem.quality).toEqual(20);
	})
})