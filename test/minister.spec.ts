import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootActionMove, RootFaction, RootFactionBoard } from '../src/interfaces';

test('Correctly parses an action to make the Duchy lose a minister on their turn', t => {

  const result = parseAction('#brigadier$->', 'D' as RootFaction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'brigadier' });
  t.is((result.things[0].start as RootFactionBoard).faction, 'D' as RootFaction);
  t.is(result.things[0].destination, null);
});

test('Correctly parses an action to make the Duchy lose a minister', t => {

  const result = parseAction('#marshalD$->', 'P' as RootFaction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'marshal' });
  t.is((result.things[0].start as RootFactionBoard).faction, 'D' as RootFaction);
  t.is(result.things[0].destination, null);
});

test('Correctly parses an action to sway a minister', t => {

  const result = parseAction('#earlofstone->$', 'D' as RootFaction) as RootActionMove;

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { cardName: 'earlofstone' });
  t.is(result.things[0].start, null);
  t.is((result.things[0].destination as RootFactionBoard).faction, 'D' as RootFaction);
});