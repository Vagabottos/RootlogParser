import test from 'ava-ts';

import { parseMove } from '../src/action-parser';
import { Faction, Piece } from '../src/interfaces/rootgame';

test('Move - place one of current player\'s warriors', t => {

  const result = parseMove('w->10', 'C' as Faction);

  t.is(result.things[0].number, 1);

  t.is((result.things[0].thing as Piece).faction, 'C');
  t.is((result.things[0].thing as Piece).pieceType, 'w');

  t.is(result.things[0].start, null);

  t.is(result.destinations[0], 10);
});

test('Move - remove one of current player\'s warriors', t => {

  const result = parseMove('w10->', 'C' as Faction);

  t.is(result.things[0].number, 1);

  t.is((result.things[0].thing as Piece).faction, 'C');
  t.is((result.things[0].thing as Piece).pieceType, 'w');

  t.is(result.things[0].start, 10);

  t.is(result.destinations[0], null);
});

test('Move - move one of current player\'s warriors', t => {

  const result = parseMove('w6->8', 'D' as Faction);

  t.is(result.things[0].number, 1);

  t.is((result.things[0].thing as Piece).faction, 'D');
  t.is((result.things[0].thing as Piece).pieceType, 'w');

  t.is(result.things[0].start, 6);

  t.is(result.destinations[0], 8);
});

test('Move - move two of current player\'s warriors, separately', t => {

  const result = parseMove('w6+w4->8', 'C' as Faction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as Piece).faction, 'C');
  t.is((result.things[0].thing as Piece).pieceType, 'w');
  t.is(result.things[0].start, 6);

  t.is(result.things[1].number, 1);
  t.is((result.things[1].thing as Piece).faction, 'C');
  t.is((result.things[1].thing as Piece).pieceType, 'w');
  t.is(result.things[1].start, 4);

  t.is(result.destinations[0], 8);
});

test('Move - move two of current player\'s warriors, together', t => {

  const result = parseMove('2w5->8', 'C' as Faction);

  t.is(result.things[0].number, 2);
  t.is((result.things[0].thing as Piece).faction, 'C');
  t.is((result.things[0].thing as Piece).pieceType, 'w');
  t.is(result.things[0].start, 5);

  t.is(result.destinations[0], 8);
});

test('Move - place four of current player\'s warriors in separate clearings', t => {

  const result = parseMove('w->8+11+6+5', 'P' as Faction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as Piece).faction, 'P');
  t.is((result.things[0].thing as Piece).pieceType, 'w');
  t.is(result.things[0].start, null);

  t.is(result.destinations[0], 8);
  t.is(result.destinations[1], 11);
  t.is(result.destinations[2], 6);
  t.is(result.destinations[3], 5);
});

test('Move - remove four of current player\'s tokens in separate clearings', t => {

  const result = parseMove('t8+t11+t6+t5->', 'C' as Faction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as Piece).faction, 'C');
  t.is((result.things[0].thing as Piece).pieceType, 't');
  t.is(result.things[0].start, 8);

  t.is(result.things[1].number, 1);
  t.is((result.things[1].thing as Piece).faction, 'C');
  t.is((result.things[1].thing as Piece).pieceType, 't');
  t.is(result.things[1].start, 11);

  t.is(result.things[2].number, 1);
  t.is((result.things[2].thing as Piece).faction, 'C');
  t.is((result.things[2].thing as Piece).pieceType, 't');
  t.is(result.things[2].start, 6);

  t.is(result.things[3].number, 1);
  t.is((result.things[3].thing as Piece).faction, 'C');
  t.is((result.things[3].thing as Piece).pieceType, 't');
  t.is(result.things[3].start, 5);

  t.is(result.destinations[0], null);
});