import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { ActionMove, Faction, FactionBoard } from '../src/interfaces';

test('Correctly parses an action to make the Duchy lose a minister with default faction board', t => {

  const result = parseAction('#brigadier$->', 'D' as Faction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'brigadier' });
  t.is((result.things[0].start as FactionBoard).faction, 'D' as Faction);
  t.is(result.destinations[0], null);
});

test('Correctly parses an action to make the Duchy lose a minister', t => {

  const result = parseAction('#marshalD$->', 'D' as Faction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'marshal' });
  t.is((result.things[0].start as FactionBoard).faction, 'D' as Faction);
  t.is(result.destinations[0], null);
});

test('Correctly parses an action to sway a minister', t => {

  const result = parseAction('#earlofstone->$', 'D' as Faction) as ActionMove;

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'earlofstone' });
  t.is(result.things[0].start, null);
  t.is((result.destinations[0] as FactionBoard).faction, 'D' as Faction);
});