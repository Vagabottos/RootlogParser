import test from 'ava-ts';

import { parseDominance } from '../src/action-parser';
import { Faction } from '../src/interfaces/rootgame';

test('Correctly parses default dominance action', t => {

  const result = parseDominance('++->C$', 'C' as Faction);

  t.is(result.target, 'C');
});

test('Correctly parses default dominance action with default faction', t => {

  const result = parseDominance('++->$', 'C' as Faction);

  t.is(result.target, 'C');
});

test('Correctly parses coalition action', t => {

  const result = parseDominance('++->E$', 'G' as Faction);
  t.is(result.target, 'E');
});