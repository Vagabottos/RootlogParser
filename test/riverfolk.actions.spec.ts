import test from 'ava-ts';

import { parseUpdateFundsAction } from '../src/action-parser';
import { ActionSetPrices } from '../src/interfaces';
import { parseRiverfolkAction, parseSetPrices } from '../src/parsers';

test('Correctly parses an action to update funds', t => {

  const result = parseUpdateFundsAction('$_f->0');

  t.is(result.funds, 0);
});

test('Correctly parses an array of actions to set the Riverfolk price for a service', t => {

  const result = parseSetPrices(['$_m->4']);

  t.deepEqual(result.priceTypes, ['m']);
  t.is(result.price, 4);
});

test('Correctly parses an array of actions to set the Riverfolk prices for multiple service', t => {

  const result = parseSetPrices(['$_m->4', '$_h->4']);

  t.deepEqual(result.priceTypes, ['m', 'h']);
  t.is(result.price, 4);
});

test('Correctly parses an array of actions to set the Riverfolk prices using default values', t => {

  const result = parseSetPrices(['$_->1']);

  t.deepEqual(result.priceTypes, ['h', 'r', 'm']);
  t.is(result.price, 1);
});

test('Correctly parses a single action to set the Riverfolk price for a service', t => {

  const result = parseRiverfolkAction('$_m->4') as ActionSetPrices;

  t.deepEqual(result.priceTypes, ['m']);
  t.is(result.price, 4);
});

test('Correctly parses a single action to set the Riverfolk prices for multiple service', t => {

  const result = parseRiverfolkAction('$_m+$_h->4') as ActionSetPrices;

  t.deepEqual(result.priceTypes, ['m', 'h']);
  t.is(result.price, 4);
});

test('Correctly parses a single action to set the Riverfolk prices using default values', t => {

  const result = parseRiverfolkAction('$_->1') as ActionSetPrices;

  t.deepEqual(result.priceTypes, ['h', 'r', 'm']);
  t.is(result.price, 1);
});
