import { Action, ActionSetPrices, RiverfolkPriceSpecial } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const SET_PRICE_REGEX = formRegex('$_[PriceType|||priceType]-><Price|||newPrice>');

export function parseSetPrices(actions: string[]): ActionSetPrices {

  const pricesSet = [];
  let newPrice;

  for (let action of actions) {
    const result = action.match(SET_PRICE_REGEX);
    const priceType = result.groups.priceType ? [result.groups.priceType] : Object.values(RiverfolkPriceSpecial);
    newPrice = +(newPrice || result.groups.newPrice);

    for (let type of priceType) {
      pricesSet.push(type);
    }
  }

  return {
    priceTypes: pricesSet,
    price: newPrice
  };

}

export function parseRiverfolkAction(action: string): Action {

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => SET_PRICE_REGEX.test(act))) {
    return parseSetPrices(simpleActions);
  }

  return null;

}