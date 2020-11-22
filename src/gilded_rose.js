// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

/*
* Update inventory
* @param {Item[]} items - an array of Items representing the inventory to be updated
* Example usage:

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

update_quality(items);
*/
export function update_quality(items) {
  function isLegendary(i) {
    return items[i].name === 'Sulfuras, Hand of Ragnaros';
  }

  function isAgedBree(i) {
    return items[i].name === 'Aged Brie';
  }

  function updateAgedBreeQuality(i) {
    if (items[i].sell_in < 0) return incrementQualityBy(i, 2);
    incrementQualityBy(i, 1);
  }

  function isBackstagePass(i) {
    return items[i].name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  function updateBackstagePassQuality(i) {
    if (items[i].sell_in < 0) return zeroOutQuality(i);
    if (items[i].sell_in < 5) return incrementQualityBy(i, 3);
    if (items[i].sell_in < 10) return incrementQualityBy(i, 2);
    return incrementQualityBy(i, 1);
  }

  function zeroOutQuality(i) {
    return items[i].quality = 0;
  }

  function incrementQualityBy(i, amount) {
    items[i].quality = Math.min(50, items[i].quality + amount);
  }

  function updateRegularItemQuality(i) {
    if (items[i].sell_in < 0) return decrementQualityBy(i, 2);
    return decrementQualityBy(i, 1);
  }

  function decrementQualityBy(i, amount) {
    items[i].quality = Math.max(0, items[i].quality - amount);
  }

  function decrementSellIn(i) {
    if (isLegendary(i)) return;
    items[i].sell_in -= 1;
  }

  for (let i = 0; i < items.length; i++) {
    decrementSellIn(i);
    if (isLegendary(i)) return;
    if (isAgedBree(i)) return updateAgedBreeQuality(i);
    if (isBackstagePass(i)) return updateBackstagePassQuality(i);
    return updateRegularItemQuality(i);
  }
}
