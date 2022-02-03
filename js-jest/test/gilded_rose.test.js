const ConjuredItem = require("../src/conjured");
const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.update();
    expect(items[0].name).toBe("foo");
  });

  describe("addItem()", () => {
    let shop;
    let cheese;
    let beer;

    beforeEach(() => {
      shop = new Shop();
      cheese = new Item("Gruyere", 0, 0);
      beer = new Item("Guiness", 0, 0);
    })

    it('adds any number of items into the items array', () => {
      shop.addItem(cheese, beer);
      expect(shop.items.length).toEqual(2);
    })
  })

  describe("update()", () => {
    let shop;
    let agedBrie;
    beforeEach(() => {
      shop = new Shop();
      agedBrie = new Item("Aged Brie", 20, 30)
    })

    it('Once the sell by date has passed, quality degrades twice as fast', () => {
      let item = new Item('apple', 2, 20);
      shop.addItem(item);
      Array.from({ length: 4 }, () => {
        shop.update()
      });
      expect(item.quality).toEqual(14)
    });

    it("The quality of 'Aged Brie' increases in quality as sellIn decreases", () => {
      shop.addItem(agedBrie);
      // Imitating that 10 days have passed, so quality of 'Aged Brie' now should be 40
      Array.from({ length: 10 }, () => {
        shop.update()
      });
      expect(agedBrie.quality).toEqual(40)
    })

    it("Checks the quality of any item never exceeds 50 - a maximum amount of quality", () => {
      shop.addItem(agedBrie);
      Array.from({ length: 70 }, () => {
        shop.update()
      });
      expect(agedBrie.quality).toEqual(shop.MAXIMUM_QUALITY )
    })

    it("Sulfuras being the item of the gods never has to be sold or decreased in Quality", () => {
      let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 20, 20)
      shop.addItem(sulfuras);
      Array.from({ length: 20 }, () => {
        shop.update()
      });
      expect(sulfuras.quality).toEqual(20)
      expect(sulfuras.sellIn).toEqual(20)
    })

    it("Backstage Passes like Aged Brie increases in quality (3x) as its Sellin value approaches", () => {
      let backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      shop.addItem(backstagePasses);
      // After 3 day passes, the quality of Backstage passes should = 19
      Array.from({ length: 3}, () => {
        shop.update();
      });
      expect(backstagePasses.quality).toEqual(19)
      expect(backstagePasses.sellIn).toEqual(2)
    })

    it("Backstage Passes like Aged Brie increases in quality (2x) as its Sellin value approaches", () => {
      let backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)
      shop.addItem(backstagePasses);
      // After 2 day passes, the quality of Backstage passes should = 14
      Array.from({ length: 2}, () => {
        shop.update();
      });
      expect(backstagePasses.quality).toEqual(14)
      expect(backstagePasses.sellIn).toEqual(8)
    })
    
    it("Backstage Passes Quality drops to zero after the concert", () => {
      let backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      shop.addItem(backstagePasses);
      // After 6 day passes, the quality of Backstage passes should be 0
      Array.from({ length: 6}, () => {
        shop.update();
      });
      expect(backstagePasses.quality).toEqual(0)
      expect(backstagePasses.sellIn).toEqual(-1)
    })

    it("Conjured Items Quality degrades twice as fast as normal items", () => {
      let conjured = new ConjuredItem("Conjured Mana Cake", 20, 20)
      shop.addItem(conjured);
      // After 3 day passes, the quality of Backstage passes should be 14
      Array.from({ length: 3}, () => {
        shop.update();
      });
      expect(conjured.sellIn).toEqual(17);
      expect(conjured.quality).toEqual(14)
    })
  })

  describe("_invalidQuality", () => {
    let shop;
    beforeEach(() => {
      shop = new Shop();
    })

    it("raises an error if the quality of an item is negative", () => {
      let badItem = new Item('banana', 5, -5);
      expect(() => {
        shop._invalidQuality(badItem)
      }).toThrow("Quality can't be negative!");
    });
  });

  describe("_isConjured", () => {
    let shop;
    beforeEach(() => {
      shop = new Shop();
    })

    it("returns true if the item includes 'Conjured' in it", () => {
      let conjured = new ConjuredItem('Conjured Mana Cake', 20, 20);
      shop.addItem(conjured);
      expect(shop._isConjured(conjured.name)).toEqual(true)
    });

    it("returns false if the item DOES NOT include 'Conjured' in it", () => {
      let conjured = new ConjuredItem('Awesome Mana Cake', 20, 20);
      shop.addItem(conjured);
      expect(shop._isConjured(conjured.name)).toEqual(false)
    });
  });

});
