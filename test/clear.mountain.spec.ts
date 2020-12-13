import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootFaction } from '../src/interfaces/rootgame';

test('Correctly parses action to clear a mountain path', t => {

  const result = parseAction('3_7->', RootFaction.Marquise);

  t.deepEqual(result.clearings, [3, 7]);
});

test('Correctly parses action to clear a mountain path with multiple digits', t => {

  const result = parseAction('6_11->', RootFaction.Marquise);

  t.deepEqual(result.clearings, [6, 11]);
});