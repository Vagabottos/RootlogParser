import test from 'ava-ts';

import { parsePriceOfFailureAction } from '../src/action-parser';
import { Faction } from '../src/interfaces';

test('Correctly parses an action to make the Duchy lose a minister', t => {

  const result = parsePriceOfFailureAction('#brigadierD$->');

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'brigadier' });
  t.is(result.things[0].start, 'D' as Faction);
  t.is(result.destinations[0], null);
});