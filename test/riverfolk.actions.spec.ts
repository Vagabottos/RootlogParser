import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { ActionSetPrices, RootFaction } from '../src/interfaces';

test('Correctly parses an action to update funds', t => {

  const result = parseAction('$_f->0', RootFaction.Eyrie);

  t.is(result.funds, 0);
});

test('Correctly parses an array of actions to set the Riverfolk price for a service', t => {

  const result = parseAction('$_m->4', RootFaction.Riverfolk);

  t.deepEqual(result.priceTypes, ['m']);
  t.is(result.price, 4);
});

test('Correctly parses actions to set the Riverfolk prices using default values', t => {

  const result = parseAction('$_->1', RootFaction.Riverfolk);

  t.deepEqual(result.priceTypes, ['h', 'r', 'm']);
  t.is(result.price, 1);
});

test('Correctly parses a single action to set the Riverfolk price for a service', t => {

  const result = parseAction('$_m->4', RootFaction.Riverfolk) as ActionSetPrices;

  t.deepEqual(result.priceTypes, ['m']);
  t.is(result.price, 4);
});

test('Correctly parses a single action to set the Riverfolk prices for multiple service', t => {

  const result = parseAction('$_m+$_h->4', RootFaction.Riverfolk) as ActionSetPrices;

  t.deepEqual(result.priceTypes, ['m', 'h']);
  t.is(result.price, 4);
});

test('Correctly parses a single action to set the Riverfolk prices using default values', t => {

  const result = parseAction('$_->1', RootFaction.Riverfolk) as ActionSetPrices;

  t.deepEqual(result.priceTypes, ['h', 'r', 'm']);
  t.is(result.price, 1);
});
