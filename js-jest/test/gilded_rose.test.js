const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const item = {
      name: "foo",
      sellIn: 0, 
      quality: 0
    }
    const gildedRose = new Shop([item]);
    const items = gildedRose.update();
    expect(items[0].name).toBe("foo");
  });

  describe("addItem()", () => {
    let shop;
    let cheese;
    let beer;

    beforeEach(() => {
      shop = new Shop();
      cheeseDouble = {
        name: "Gruyere",
        sellIn: 0, 
        quality: 0
      }
      beerDouble = {
        name: "Guiness",
        sellIn: 0, 
        quality: 0
      }

    })

    it('adds any number of items into the items array', () => {
      shop.addItem(cheese, beer);
      expect(shop.items.length).toEqual(2);
    })
  })

  describe("update()", () => {
    let shop;
    let agedBrieDbl;
    beforeEach(() => {
      shop = new Shop();
      agedBrieDbl = {
        name: "Aged Brie",
        sellIn: 20, 
        quality: 30
      }
    })

    it('Once the sell by date has passed, quality degrades twice as fast', () => {
      let itemDbl = {
        name: "apple",
        sellIn: 2, 
        quality: 20
      }
      shop.addItem(itemDbl);
      Array.from({ length: 4 }, () => {
        shop.update()
      });
      expect(itemDbl.quality).toEqual(14)
    });

    it("The quality of 'Aged Brie' increases in quality as sellIn decreases", () => {
      shop.addItem(agedBrieDbl);
      // Imitating that 10 days have passed, so quality of 'Aged Brie' now should be 40
      Array.from({ length: 10 }, () => {
        shop.update()
      });
      expect(agedBrieDbl.quality).toEqual(40)
    })

    it("Checks the quality of any item never exceeds 50 - a maximum amount of quality", () => {
      shop.addItem(agedBrieDbl);
      Array.from({ length: 70 }, () => {
        shop.update()
      });
      expect(agedBrieDbl.quality).toEqual(shop.MAXIMUM_QUALITY )
    })

    it("Sulfuras being the item of the gods never has to be sold or decreased in Quality", () => {
      let sulfurasDbl = {
        name: "Sulfuras, Hand of Ragnaros",
        sellIn: 20, 
        quality: 20
      }
      shop.addItem(sulfurasDbl);
      Array.from({ length: 20 }, () => {
        shop.update()
      });
      expect(sulfurasDbl.quality).toEqual(20)
      expect(sulfurasDbl.sellIn).toEqual(20)
    })

    it("Backstage Passes like Aged Brie increases in quality (3x) as its Sellin value approaches", () => {
      let backstagePassesDbl = {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 5, 
        quality: 10
      }
      shop.addItem(backstagePassesDbl);
      // After 3 day passes, the quality of Backstage passes should = 19
      Array.from({ length: 3}, () => {
        shop.update();
      });
      expect(backstagePassesDbl.quality).toEqual(19)
      expect(backstagePassesDbl.sellIn).toEqual(2)
    })

    it("Backstage Passes like Aged Brie increases in quality (2x) as its Sellin value approaches", () => {
      let backstagePassesDbl = {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 10, 
        quality: 10
      }
      shop.addItem(backstagePassesDbl);
      // After 2 day passes, the quality of Backstage passes should = 14
      Array.from({ length: 2}, () => {
        shop.update();
      });
      expect(backstagePassesDbl.quality).toEqual(14)
      expect(backstagePassesDbl.sellIn).toEqual(8)
    })
    
    it("Backstage Passes Quality drops to zero after the concert", () => {
      let backstagePassesDbl = {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 5, 
        quality: 10
      }
      shop.addItem(backstagePassesDbl);
      // After 6 day passes, the quality of Backstage passes should be 0
      Array.from({ length: 6}, () => {
        shop.update();
      });
      expect(backstagePassesDbl.quality).toEqual(0)
      expect(backstagePassesDbl.sellIn).toEqual(-1)
    })

    it("Conjured Items Quality degrades twice as fast as normal items", () => {
      let conjureDbl = {
        name: "Conjured Mana Cake",
        sellIn: 20, 
        quality: 20
      }
      shop.addItem(conjureDbl);
      // After 3 day passes, the quality of Backstage passes should be 14
      Array.from({ length: 3}, () => {
        shop.update();
      });
      expect(conjureDbl.sellIn).toEqual(17);
      expect(conjureDbl.quality).toEqual(14)
    })
  })

  describe("_invalidQuality", () => {
    let shop;
    beforeEach(() => {
      shop = new Shop();
    })

    it("raises an error if the quality of an item is negative", () => {
      let badItemDbl = {
        name: "banana",
        sellIn: 5, 
        quality: -5
      }
      expect(() => {
        shop._invalidQuality(badItemDbl)
      }).toThrow("Quality can't be negative!");
    });
  });

  describe("_isConjured", () => {
    let shop;
    beforeEach(() => {
      shop = new Shop();
    })

    it("returns true if the item includes 'Conjured' in it", () => {
      let conjuredDbl = {
        name: "Conjured Mana Cake",
        sellIn: 20, 
        quality: 20
      }
      shop.addItem(conjuredDbl);
      expect(shop._isConjured(conjuredDbl.name)).toEqual(true)
    });

    it("returns false if the item DOES NOT include 'Conjured' in it", () => {
      let conjuredDbl = {
        name: "Awesome Mana Cake",
        sellIn: 20, 
        quality: 20
      }
      shop.addItem(conjuredDbl);
      expect(shop._isConjured(conjuredDbl.name)).toEqual(false)
    });
  });

});

describe("Item class", () => {
  let item;
  beforeEach( () =>{
    item = new Item("Bad Juju's voodoo doll", 20, 20);
  })
  it("creates an instance of itself", ()=>{
    expect(item).toBeInstanceOf(Item)
  })

  it("instances are created with various attributes", ()=>{
    expect(item.name).toEqual("Bad Juju's voodoo doll");
    expect(item.sellIn).toEqual(20);
    expect(item.quality).toEqual(20);
  })
})