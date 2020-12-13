import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { CardName, Faction, Item } from '../src/interfaces/rootgame';

test('Craft item parses correctly', t => {

  const result = parseAction('Z%t', Faction.Riverfolk);

  t.is(result.craftCard, undefined);
  t.is(result.craftItem, 't' as Item);
});

test('Craft card parses correctly with card abbreviation', t => {

  const result = parseAction('Zsabo', Faction.Corvid);

  t.is(result.craftCard, 'saboteurs' as CardName);
  t.is(result.craftItem, undefined);
});

test('Craft card parses correctly with full name of card', t => {

  const result = parseAction('Zsaboteurs', Faction.Woodland);

  t.is(result.craftCard, 'saboteurs' as CardName);
  t.is(result.craftItem, undefined);
});
