import test from 'ava-ts';

import { parseCraft } from '../src/action-parser';
import { CardName, Item } from '../src/interfaces/rootgame';

test('Craft item parses correctly', t => {

  const result = parseCraft('Z%t');

  t.is(result.craftCard, undefined);
  t.is(result.craftItem, 't' as Item);
});

test('Craft card parses correctly with card abbreviation', t => {

  const result = parseCraft('Zsabo');

  t.is(result.craftCard, 'saboteurs' as CardName);
  t.is(result.craftItem, undefined);
});

test('Craft card parses correctly with full name of card', t => {

  const result = parseCraft('Zsaboteurs');

  t.is(result.craftCard, 'saboteurs' as CardName);
  t.is(result.craftItem, undefined);
});
