import test from 'ava-ts';

import { ActionMove, Faction, Suit } from '../src/interfaces';
import { parseVagabondAction } from '../src/parsers';

test('Correctly parses an action to choose a Character', t => {

  const result = parseVagabondAction('#tinker->$', 'V' as Faction) as ActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { cardName: 'tinker' },
    start: null
  }]);
  t.deepEqual(result.destinations, ['V' as Faction]);
});

test('Correctly parses an action to restore all items', t => {

  const result = parseVagabondAction('$_d->s', 'V' as Faction) as ActionMove;

  t.deepEqual(result.things, []);  // TODO: Implement in code
  t.deepEqual(result.destinations, []);  // TODO: Implement in code
});