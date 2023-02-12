import test from 'ava-ts';
import { parseAction } from '../src/action-parser';

import { RootActionMove, RootActionType, RootFaction, RootFactionBoard, RootSuit } from '../src/interfaces';

test('Correctly parses placing a Keepers waystation', t => {

  const result = parseAction('b_t_j->3', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: RootFaction.Keepers,
      piece: 'b_t_j',
      pieceType: 'b'
    },
    start: null,
    destination: 3
  }]);
});

test('Correctly parses delving a relic', t => {

  const result = parseAction('t_j1_2_5_10->10', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: RootFaction.Keepers,
      piece: 't_j',
      pieceType: 't'
    },
    start: {
      clearings: [1, 2, 5, 10],
    },
    destination: 10
  }]);
});

test('Correctly parses flipping a relic', t => {

  const result = parseAction('t3^t_2_j', RootFaction.Keepers);

  t.deepEqual(result, {
    type: RootActionType.FlipRelic,
    clearing: 3,
    relic: 't_2_j'
  });
});

test('Correctly parses recovering a relic', t => {

  const result = parseAction('t_2_j2->$', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: RootFaction.Keepers,
      piece: 't_2_j',
      pieceType: 't'
    },
    start: 2,
    destination: {
      faction: RootFaction.Keepers
    }
  }]);
});

test('Correctly parses adding a card to the retinue', t => {

  const result = parseAction('M#K->$_1', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      suit: RootSuit.Mouse,
      cardName: null,
    },
    start: RootFaction.Keepers,
    destination: {
      faction: RootFaction.Keepers,
      sublocation: 1
    }
  }]);
});

test('Correctly parses discarding a Faithful Retainer from the retinue', t => {

  const result = parseAction('#faith$_1->', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      suit: null,
      cardName: 'faith',
    },
    start: {
      faction: RootFaction.Keepers,
      sublocation: 1,
    },
    destination: null
  }]);
});

test('Correctly parses discarding a deck card from the retinue', t => {

  const result = parseAction('B#$_2->', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      suit: RootSuit.Bird,
      cardName: null,
    },
    start: {
      faction: RootFaction.Keepers,
      sublocation: 2,
    },
    destination: 'Discard pile'
  }]);
});

test('Correctly parses removing relic after battle', t => {

  const result = parseAction('Kt_2_j3->', RootFaction.Eyrie);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: RootFaction.Keepers,
      piece: 't_2_j',
      pieceType: 't',
    },
    start: 3,
    destination: null
  }]);
});

test('Correctly parses placing relic in forest during setup', t => {

  const result = parseAction('t_j->1_2_5_10', RootFaction.Keepers);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: RootFaction.Keepers,
      piece: 't_j',
      pieceType: 't',
    },
    start: null,
    destination: {
      clearings: [1, 2, 5, 10]
    }
  }]);
});

test('Correctly parses placing relic in forest after removal', t => {

  const result = parseAction('Kt_2_j->1_2_5_10', RootFaction.Eyrie);

  t.deepEqual(result.things, [{
    number: 1,
    thing: {
      faction: RootFaction.Keepers,
      piece: 't_2_j',
      pieceType: 't',
    },
    start: null,
    destination: {
      clearings: [1, 2, 5, 10]
    }
  }]);
});
