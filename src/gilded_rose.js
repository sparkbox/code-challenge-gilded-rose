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
  function isLegendary(i) { return items[i].name === 'Sulfuras, Hand of Ragnaros'; }

  function decrementSellIn(i) {
    if (isLegendary(i)) return;
    items[i].sell_in -= 1;
  }

  for (let i = 0; i < items.length; i++) {
    decrementSellIn(i);
    if (isLegendary(i)) return;
    if (items[i].name !== 'Aged Brie' && items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        items[i].quality = items[i].quality - 1
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 10) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 5) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].sell_in < 0) {
      if (items[i].name !== 'Aged Brie') {
        if (items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            items[i].quality = items[i].quality - 1
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}
