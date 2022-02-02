class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAXIMUM_QUALITY = 50;
  }

  addItem(...items){
    this.items.push(...items)
  }
  

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality--;
          }
        }
        else {
        // I decided to put this in, as if the item quality is negative, it just stays negative
        this._invalidQuality(this.items[i])
        }

      } else { 
        if (this.items[i].quality < this.MAXIMUM_QUALITY) {
          this.items[i].quality++;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < this.MAXIMUM_QUALITY) {
                this.items[i].quality++;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < this.MAXIMUM_QUALITY) {
                this.items[i].quality++;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn--;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality--;
              }
            }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < this.MAXIMUM_QUALITY) {
            this.items[i].quality++;
          }
        }
      }
    }

    return this.items;
  }

  _invalidQuality(item){
    if(item.quality < 0){
      throw new Error("Quality can't be negative!")
    }
  }
  
}



module.exports = {
  Item,
  Shop
}
