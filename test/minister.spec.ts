import test from 'ava-ts';

import { parsePriceOfFailureAction } from '../src/action-parser';
import { ActionMove, Faction } from '../src/interfaces';
import { parseDuchyAction } from '../src/parsers';

test('Correctly parses an action to make the Duchy lose a minister', t => {

  const result = parsePriceOfFailureAction('#brigadierD$->');

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'brigadier' });
  t.is(result.things[0].start, 'D' as Faction);
  t.is(result.destinations[0], null);
});

test('Correctly parses an action to sway a minister', t => {

  const result = parseDuchyAction('#earlofstone->$') as ActionMove;

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'earlofstone' });
  t.is(result.things[0].start, null);
  t.is(result.destinations[0], 'D' as Faction);
});