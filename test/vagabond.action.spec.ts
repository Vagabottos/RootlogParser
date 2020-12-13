import test from 'ava-ts';

import { ActionMove, RootFaction } from '../src/interfaces';
import { parseAction } from '../src/action-parser';

test('Correctly parses an action to choose a Character', t => {

  const result = parseAction('#tinker->$', 'V' as RootFaction) as ActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { cardName: 'tinker' },
    start: null
  }]);
  t.deepEqual(result.destinations, ['V' as RootFaction]);
});

test('Correctly parses an action to restore all items', t => {

  const result = parseAction('$_d->s', 'V' as RootFaction) as ActionMove;

  t.deepEqual(result.things, []);  // TODO: Implement in code
  t.deepEqual(result.destinations, []);  // TODO: Implement in code
});