import test from 'ava-ts';

import { RootActionMove, RootFaction, RootFactionBoard, RootItemState, RootVagabondItemSpecial } from '../src/interfaces';
import { parseAction } from '../src/action-parser';

test('Correctly parses an action to choose a Character', t => {

  const result = parseAction('#tinker->$', 'V' as RootFaction) as RootActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { cardName: 'tinker' },
    start: null,
    destination: {faction: RootFaction.Vagabond} as RootFactionBoard
  }]);
});

test('Correctly parses an action to restore all items', t => {

  const result = parseAction('%_d->s', RootFaction.Vagabond) as RootActionMove;

  t.deepEqual(result.things, [{
    number: -1,
    thing: null,
    start: {faction: RootFaction.Vagabond} as RootFactionBoard,
    destination: RootVagabondItemSpecial.Satchel
  }]);
});

test('Correctly parses an action to restore and refresh all items', t => {

  const result = parseAction('%_d->s+r', RootFaction.Vagabond) as RootActionMove;

  t.deepEqual(result.things, [{
    number: -1,
    thing: null,
    start: {faction: RootFaction.Vagabond} as RootFactionBoard,
    destination: RootVagabondItemSpecial.Satchel
  },
  {
    number: -1,
    thing: null,
    start: {faction: RootFaction.Vagabond} as RootFactionBoard,
    destination: RootItemState.FaceUp
  }]);
});