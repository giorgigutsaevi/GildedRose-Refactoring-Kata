const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("::addItem", ()=>{
    let shop;
    let cheese; 
    let beer;

    beforeEach(()=>{
      shop = new Shop();
      cheese = new Item("Gruyere", 0, 0);
      beer = new Item("Guiness", 0, 0);

    })
    it('adds any number of items into the items array', ()=>{
       shop.addItem(cheese, beer);
       expect(shop.items.length).toEqual(2);
    })
  })

});
