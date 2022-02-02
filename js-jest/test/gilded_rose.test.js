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
      let item = new Item('apple', 2, 20);
      shop.addItem(item)
      Array.from({length: 4}, () => {
        shop.updateQuality()
      });
      expect(item.quality).toEqual(14)
    })
  })

  describe("_invalidQuality", ()=>{
    let shop;
    beforeEach(()=>{
      shop = new Shop();
    })

    it("raises an error if the quality of an item is negative", ()=>{
      let badItem = new Item('banana', 5, -5);
      expect(() => {
        shop._invalidQuality(badItem)
      }).toThrow("Quality can't be negative!");
    });
  });

});
