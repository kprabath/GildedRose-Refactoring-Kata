import { Item } from "@/gilded-rose";

import { ItemNameEnum } from "./enums";

export const getQualityDowngradeFactorForGivenItem = (item: Item): number => {
  const hasSellByDatePassed = item.sellIn < 0;
  if (item.name == ItemNameEnum.AGED_BRIE) {
    if (hasSellByDatePassed) {
      return 2;
    }
    // increase quality by 1 point
    return 1;
  } else if (item.name === ItemNameEnum.BACK_STAGE_PASSES) {
    if (hasSellByDatePassed) {
      // quality should be reset to 0 for ItemNameEnum.BACK_STAGE_PASSES items
      return -item.quality;
    }
    if (item.sellIn <= 5) {
      // increase quality by 3 points
      return 3;
    }
    if (item.sellIn <= 10) {
      // increase quality by 2 points
      return 2;
    }
    return 1;
  } else if (item.name === ItemNameEnum.CONJURED) {
    // quality decreases twice as fast as normal items
    return -2;
  } else {
    // when sell by date has passed, Quality degrades twice as fast
    if (hasSellByDatePassed) {
      return -2;
    }
    // reduce quality by one point if the item is a normal item
    return -1;
  }
};
