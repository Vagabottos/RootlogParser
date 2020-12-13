import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootCardName, RootFaction, RootItem } from '../src/interfaces/rootgame';

test('Craft item parses correctly', t => {

  const result = parseAction('Z%t', RootFaction.Riverfolk);

  t.is(result.craftCard, undefined);
  t.is(result.craftItem, 't' as RootItem);
});

test('Craft card parses correctly with card abbreviation', t => {

  const result = parseAction('Zsabo', RootFaction.Corvid);

  t.is(result.craftCard, 'saboteurs' as RootCardName);
  t.is(result.craftItem, undefined);
});

test('Craft card parses correctly with full name of card', t => {

  const result = parseAction('Zsaboteurs', RootFaction.Woodland);

  t.is(result.craftCard, 'saboteurs' as RootCardName);
  t.is(result.craftItem, undefined);
});
