// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function isLegendary(item) {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

function isAgedBree(item) {
  return item.name === 'Aged Brie';
}

function updateAgedBreeQuality(item) {
  if (item.sell_in < 0) return incrementQualityBy(item, 2);
  incrementQualityBy(item, 1);
}

function isBackstagePass(item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function updateBackstagePassQuality(item) {
  if (item.sell_in < 0) return zeroOutQuality(item);
  if (item.sell_in < 5) return incrementQualityBy(item, 3);
  if (item.sell_in < 10) return incrementQualityBy(item, 2);
  return incrementQualityBy(item, 1);
}

function updateRegularItemQuality(item) {
  if (item.sell_in < 0) return decrementQualityBy(item, 2);
  return decrementQualityBy(item, 1);
}

function zeroOutQuality(item) {
  return item.quality = 0;
}

function incrementQualityBy(item, amount) {
  item.quality = Math.min(50, item.quality + amount);
}

function decrementQualityBy(item, amount) {
  item.quality = Math.max(0, item.quality - amount);
}

function decrementSellIn(item) {
  if (isLegendary(item)) return;
  item.sell_in -= 1;
}

function updateItem(item) {
  decrementSellIn(item);
  if (isLegendary(item)) return;
  if (isAgedBree(item)) return updateAgedBreeQuality(item);
  if (isBackstagePass(item)) return updateBackstagePassQuality(item);
  return updateRegularItemQuality(item);
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
  items.forEach(updateItem);
}
