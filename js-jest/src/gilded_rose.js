const ConjuredItem = require("./conjured");

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
  
  update() {
    this.items.forEach((item) => {

      if(this._isConjured(item.name)){
        if((this._isQualityBelowMaximum(item.quality))){
          item.sellIn--;
          item.quality -= 2;
        }
      }

      else if(this._isAgedBrie(item.name)){
        if(this._isQualityBelowMaximum(item.quality)){
          item.quality++;
          item.sellIn--;
        }
      }
      else if(this._isBackstagePasses(item.name)){
        if(item.sellIn <= 0 && this._isQualityBelowMaximum(item.quality)){
          item.quality = 0;
          item.sellIn--;
        }else if(item.sellIn < 6 && this._isQualityBelowMaximum(item.quality)){
          item.sellIn--;
          item.quality += 3;
        }else if((item.sellIn > 6 && item.sellIn < 11) && this._isQualityBelowMaximum(item.quality)){
            item.sellIn--;
            item.quality += 2;
        }
      }
      else if(this._isSulfuras(item.name)){
        item.sellIn == item.sellIn;
        item.quality == item.quality;
      }
      else{
        (this._isRegularItem(item.name))
        if(item.sellIn > 0 && item.quality > 0){
          item.quality--;
          item.sellIn--;
        }else{
          item.quality -= 2;
        }
      
      }
    })
    return this.items;
  }
  // private helper methods for my Shop class
  _isConjured(itemName){
    return itemName.split(" ").map(word => word).some(word => word === "Conjured")
  }
  
  _isSulfuras(itemName){
    return itemName === "Sulfuras, Hand of Ragnaros"
  }

  _isAgedBrie(itemName){
    return itemName === "Aged Brie"
  }
  _isBackstagePasses(itemName){
    return itemName === "Backstage passes to a TAFKAL80ETC concert"
  }

  _isRegularItem(itemName){
    const specialItems = [
      'Aged Brie',
      'Backstage passes to a TAFKAL80ETC concert',
      'Sulfuras, Hand of Ragnaros'
    ]
    return !specialItems.includes(itemName) ? true : false;
  }

  _isQualityBelowMaximum(num){
    return num < this.MAXIMUM_QUALITY ? true : false
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
