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
    this.items.forEach((item, idx) => {
      if(item.name == 'Aged Brie'){
        if(this._isBelowMaximum(item.quality)){
          item.quality++;
          item.sellIn--;
        }
      }
      if(item.name === 'Backstage passes to a TAFKAL80ETC concert'){
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
      if(item.name === "Sulfuras, Hand of Ragnaros"){
        item.sellIn == item.sellIn;
        item.quality == item.quality;
      }
      if(item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert' && item.name !== "Sulfuras, Hand of Ragnaros" ){
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
