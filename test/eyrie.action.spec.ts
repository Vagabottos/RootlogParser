import test from 'ava-ts';
import { parseAction } from '../src/action-parser';

import { RootActionMove, RootFaction, RootFactionBoard, RootSuit } from '../src/interfaces';

test('Correctly parses an array of actions to add a card to the Decree', t => {

  const result = parseAction('R#E->$_r', RootFaction.Eyrie);

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: RootSuit.Rabbit, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  }]);
});

test('Correctly parses an array of actions to add two cards to the Decree', t => {

  const result = parseAction('2R#E->$_x', RootFaction.Eyrie);

  t.deepEqual(result.things, [{
    number: 2,
    thing: { suit: RootSuit.Rabbit, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  }]);
});

test('Correctly parses an array of actions to add two cards of different suits to the Decree', t => {

  const result = parseAction('(R+B)#E->$_x', RootFaction.Eyrie);

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: RootSuit.Rabbit, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  },
  {
    number: 1,
    thing: { suit: RootSuit.Bird, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  }]);
});

test('Correctly parses a string of actions to add a card to the Decree', t => {

  const result = parseAction('R#E->$_r', RootFaction.Eyrie) as RootActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: RootSuit.Rabbit, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  }]);
});

test('Correctly parses a string of actions to add two cards to the Decree', t => {

  const result = parseAction('2R#E->$_x', RootFaction.Eyrie) as RootActionMove;

  t.deepEqual(result.things, [{
    number: 2,
    thing: { suit: RootSuit.Rabbit, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  }]);
});

test('Correctly parses a string of actions to add two cards of different suits to the Decree', t => {

  const result = parseAction('(R+B)#E->$_x', RootFaction.Eyrie) as RootActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: {suit: RootSuit.Rabbit, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  },
  {
    number: 1,
    thing: {suit: RootSuit.Bird, cardName: null},
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: null
  }]);
});

test('Correctly parses an action to purge the Decree', t => {

  const result = parseAction('$_->', RootFaction.Eyrie) as RootActionMove;

  t.deepEqual(result.things, [{
    number: -1,
    thing: null,
    start: {faction: RootFaction.Eyrie} as RootFactionBoard,
    destination: 'Discard pile'
  }]);
});

test('Correctly parses an action to choose a Leader', t => {

  const result = parseAction('#commander->$', RootFaction.Eyrie) as RootActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { cardName: 'commander' },
    start: null,
    destination: {faction: RootFaction.Eyrie} as RootFactionBoard
  }]);
});