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
    this.items.forEach((item) => {
      if(this._isAgedBrie(item.name)){
        if(this._isBelowMaximum(item.quality)){
          item.quality++;
          item.sellIn--;
        }
      }
      if(this._isBackstagePasses(item.name)){
        if(item.sellIn <= 0 && this._isBelowMaximum(item.quality)){
          item.quality = 0;
          item.sellIn--;
        }else if(item.sellIn < 6 && this._isBelowMaximum(item.quality)){
          item.sellIn--;
          item.quality += 3;
        }else if(item.sellIn < 11 && this._isBelowMaximum(item.quality)){
            item.sellIn--;
            item.quality += 2;
        }
      }
      if(this._isSulfuras(item.name)){
        item.sellIn == item.sellIn;
        item.quality == item.quality;
      }
      if(this._isRegularItem(item.name)){
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

  _isBelowMaximum(num){
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
