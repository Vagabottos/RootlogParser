import test from 'ava-ts';
import { parseAction } from '../src/action-parser';

import { RootActionMove, RootFaction, RootFactionBoard, RootSuit } from '../src/interfaces';

test('Correctly parses placing the warlord', t => {

  const result = parseAction('w_w->1', RootFaction.Hundreds);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: 'H',
      piece: 'w_w',
      pieceType: 'w'
    },
    start: null,
    destination: 1
  }]);
});

test('Correctly parses picking a mood', t => {

  const result = parseAction('#rowdy->$', RootFaction.Hundreds);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      cardName: 'rowdy'
    },
    start: null,
    destination: {faction: 'H'}
  }]);
});
