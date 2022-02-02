const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("addItem()", ()=>{
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

  describe("updateQuality()", () => {
      let shop;
    beforeEach(()=>{
      shop = new Shop();
    })

    it('Once the sell by date has passed, quality degrades twice as fast', ()=>{
      let item = new Item('soup', 2, 20);
      shop.addItem(item)
      Array.from({length: 4}, () => {
        shop.updateQuality(item)
      });
      expect(item.quality).toEqual(14)
    })

  })

});
