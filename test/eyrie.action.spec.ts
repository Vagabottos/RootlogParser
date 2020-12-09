import test from 'ava-ts';

import { ActionMove, Faction, Suit } from '../src/interfaces';
import { parseAddToDecree, parseEyrieAction } from '../src/parsers';

test('Correctly parses an array of actions to add a card to the Decree', t => {

  const result = parseAddToDecree(['R#E->$_r']);

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: 'R' as Suit, cardName: null},
    start: 'E' as Faction
  }]);
  t.deepEqual(result.destinations, [null]);  // TODO: Implement in code
});

test('Correctly parses an array of actions to add two cards to the Decree', t => {

  const result = parseAddToDecree(['2R#E->$_x']);

  t.deepEqual(result.things, [{
    number: 2,
    thing: { suit: 'R' as Suit, cardName: null},
    start: 'E' as Faction
  }]);
  t.deepEqual(result.destinations, [null]);  // TODO: Implement in code
});

test('Correctly parses an array of actions to add two cards of different suits to the Decree', t => {

  const result = parseAddToDecree(['R#E->$_x', 'B#E->$_x']);

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: 'R' as Suit, cardName: null},
    start: 'E' as Faction
  },
  {
    number: 1,
    thing: { suit: 'B' as Suit, cardName: null},
    start: 'E' as Faction
  }]);
  t.deepEqual(result.destinations, [null, null]);  // TODO: Implement in code
});

test('Correctly parses a string of actions to add a card to the Decree', t => {

  const result = parseEyrieAction('R#E->$_r') as ActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: 'R' as Suit, cardName: null},
    start: 'E' as Faction
  }]);
  t.deepEqual(result.destinations, [null]);  // TODO: Implement in code
});

test('Correctly parses a string of actions to add two cards to the Decree', t => {

  const result = parseEyrieAction('2R#E->$_x') as ActionMove;

  t.deepEqual(result.things, [{
    number: 2,
    thing: { suit: 'R' as Suit, cardName: null},
    start: 'E' as Faction
  }]);
  t.deepEqual(result.destinations, [null]);  // TODO: Implement in code
});

test('Correctly parses a string of actions to add two cards of different suits to the Decree', t => {

  const result = parseEyrieAction('(R+B)#E->$_x') as ActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { suit: 'R' as Suit, cardName: null},
    start: 'E' as Faction
  },
  {
    number: 1,
    thing: { suit: 'B' as Suit, cardName: null},
    start: 'E' as Faction
  }]);
  t.deepEqual(result.destinations, [null, null]);  // TODO: Implement in code
});

test('Correctly parses an action to purge the Decree', t => {

  const result = parseEyrieAction('$_->') as ActionMove;

  t.deepEqual(result.things, []);  // TODO: Implement in code
  t.deepEqual(result.destinations, []);
});

test('Correctly parses an action to choose a Leader', t => {

  const result = parseEyrieAction('#commander->$') as ActionMove;

  t.deepEqual(result.things, [{
    number: 1,
    thing: { cardName: 'commander' },
    start: null
  }]);
  t.deepEqual(result.destinations, ['E' as Faction]);
});