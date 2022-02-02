const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
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

  describe("updateQuality()", () => {
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
        shop.updateQuality()
      });
      expect(item.quality).toEqual(14)
    });

    it("The quality of 'Aged Brie' increases in quality as sellIn decreases", () => {
      shop.addItem(agedBrie);
      // Imitating that 10 days have passed, so quality of 'Aged Brie' now should be 40
      Array.from({ length: 10 }, () => {
        shop.updateQuality()
      });
      expect(agedBrie.quality).toEqual(40)
    })

    it("Checks the quality of any item never exceeds 50", () => {
      shop.addItem(agedBrie);
      Array.from({ length: 50 }, () => {
        shop.updateQuality()
      });
      expect(agedBrie.quality).toEqual(50)
    })

    it("Sulfuras being the item of the gods never has to be sold or decreased in Quality", () => {
      let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 20, 20)
      shop.addItem(sulfuras);
      Array.from({ length: 20 }, () => {
        shop.updateQuality()
      });
      expect(sulfuras.quality).toEqual(20)
      expect(sulfuras.sellIn).toEqual(20)
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

});
