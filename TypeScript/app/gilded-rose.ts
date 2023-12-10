import { ItemNameEnum } from "./library/enums";
import { getQualityDowngradeFactorForGivenItem } from "./library/util";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      const { name, quality } = item;
      // if item name is Sulfuras do nothing skip the iteration
      if (name === ItemNameEnum.SULFURAS) {
        continue;
      }
      // substract a date for each item
      item.sellIn -= 1;

      // increase or substract the quality depending on the item
      const qualityAdder = getQualityDowngradeFactorForGivenItem(item);
      const isQualityBetweenUpperAndLowerRange = quality > 0 && quality < 50;

      if (isQualityBetweenUpperAndLowerRange) {
        item.quality = quality + qualityAdder;
      }
    }
    return this.items;
  }
}
