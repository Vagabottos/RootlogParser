import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootFaction } from '../src/interfaces/rootgame';

test('Correctly parses default dominance action', t => {

  const result = parseAction('++->C$', 'C' as RootFaction);

  t.is(result.target, 'C');
});

test('Correctly parses default dominance action with default faction', t => {

  const result = parseAction('++->$', 'C' as RootFaction);

  t.is(result.target, 'C');
});

test('Correctly parses coalition action', t => {

  const result = parseAction('++->E$', 'G' as RootFaction);
  t.is(result.target, 'E');
});