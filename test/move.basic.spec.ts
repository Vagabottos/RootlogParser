import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootCard, RootFaction, RootFactionBoard, RootItem, RootItemState, RootPiece, RootLocation } from '../src/interfaces/rootgame';

test('Move - place one of current player\'s warriors', t => {

  const result = parseAction('w->10', 'C' as RootFaction);

  t.is(result.things[0].number, 1);

  t.is((result.things[0].thing as RootPiece).faction, 'C');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');

  t.is(result.things[0].start, null);

  t.is(result.things[0].destination, 10);
});

test('Move - remove one of current player\'s warriors', t => {

  const result = parseAction('w10->', 'C' as RootFaction);

  t.is(result.things[0].number, 1);

  t.is((result.things[0].thing as RootPiece).faction, 'C');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');

  t.is(result.things[0].start, 10);

  t.is(result.things[0].destination, null);
});

test('Move - move one of current player\'s warriors', t => {

  const result = parseAction('w6->8', 'D' as RootFaction);

  t.is(result.things[0].number, 1);

  t.is((result.things[0].thing as RootPiece).faction, 'D');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');

  t.is(result.things[0].start, 6);

  t.is(result.things[0].destination, 8);
});

test('Move - move two of current player\'s warriors, separately', t => {

  const result = parseAction('w6+w4->8', 'C' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootPiece).faction, 'C');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');
  t.is(result.things[0].start, 6);

  t.is(result.things[1].number, 1);
  t.is((result.things[1].thing as RootPiece).faction, 'C');
  t.is((result.things[1].thing as RootPiece).pieceType, 'w');
  t.is(result.things[1].start, 4);

  t.is(result.things[0].destination, 8);
});

test('Move - move two of current player\'s warriors, together', t => {

  const result = parseAction('2w5->8', 'C' as RootFaction);

  t.is(result.things[0].number, 2);
  t.is((result.things[0].thing as RootPiece).faction, 'C');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');
  t.is(result.things[0].start, 5);

  t.is(result.things[0].destination, 8);
});

test('Move - place four of current player\'s warriors in separate clearings', t => {

  const result = parseAction('w->8+11+6+5', 'P' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootPiece).faction, 'P');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');
  t.is(result.things[0].start, null);

  t.is(result.things[0].destination, 8);
  t.is(result.things[1].destination, 11);
  t.is(result.things[2].destination, 6);
  t.is(result.things[3].destination, 5);
});

test('Move - remove four of current player\'s tokens in separate clearings', t => {

  const result = parseAction('t8+t11+t6+t5->', 'C' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootPiece).faction, 'C');
  t.is((result.things[0].thing as RootPiece).pieceType, 't');
  t.is(result.things[0].start, 8);
  t.is(result.things[0].destination, null);

  t.is(result.things[1].number, 1);
  t.is((result.things[1].thing as RootPiece).faction, 'C');
  t.is((result.things[1].thing as RootPiece).pieceType, 't');
  t.is(result.things[1].start, 11);
  t.is(result.things[1].destination, null);

  t.is(result.things[2].number, 1);
  t.is((result.things[2].thing as RootPiece).faction, 'C');
  t.is((result.things[2].thing as RootPiece).pieceType, 't');
  t.is(result.things[2].start, 6);
  t.is(result.things[2].destination, null);

  t.is(result.things[3].number, 1);
  t.is((result.things[3].thing as RootPiece).faction, 'C');
  t.is((result.things[3].thing as RootPiece).pieceType, 't');
  t.is(result.things[3].start, 5);
  t.is(result.things[3].destination, null);
});

test('Move - place current player\'s warriors on faction board', t => {

  const result = parseAction('w->$', 'A' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootPiece).faction, 'A');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');
  t.is(result.things[0].start, null);

  t.is((result.things[0].destination as RootFactionBoard).faction, 'A');
});

test('Move - place current player\'s warriors on faction board', t => {

  const result = parseAction('w$->', 'L' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootPiece).faction, 'L');
  t.is((result.things[0].thing as RootPiece).pieceType, 'w');
  t.is((result.things[0].start as RootFactionBoard).faction, 'L');

  t.is(result.things[0].destination, null);
});

test('Move - place cards onto Woodland Alliance\'s faction board', t => {

  const result = parseAction('2R#C->A$', 'C' as RootFaction);

  t.is(result.things[0].number, 2);
  t.is((result.things[0].thing as RootCard).suit, 'R');
  t.is(result.things[0].start, 'C' as RootFaction);

  t.is((result.things[0].destination as RootFactionBoard).faction, 'A');
});

test('Move - exhaust sword', t => {

  const result = parseAction('%s->e', 'O' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is(result.things[0].thing as RootItem, 's');
  t.is(result.things[0].start, null);

  t.is(result.things[0].destination, 'e' as RootItemState);
});

test('Move - refresh sword', t => {

  const result = parseAction('%s->r', 'V' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is(result.things[0].thing as RootItem, 's');
  t.is(result.things[0].start, null);

  t.is(result.things[0].destination, 'r' as RootItemState);
});

test('Move - remove sword', t => {

  const result = parseAction('%s->', 'V' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is(result.things[0].thing as RootItem, 's');
  t.is(result.things[0].start, null);

  t.is(result.things[0].destination, null);
});

test('Move - retrieve from Discard pile', t => {

  const result = parseAction('R#@*->P', 'P' as RootFaction);

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootCard).cardName, 'Ambush');
  t.is((result.things[0].thing as RootCard).suit, 'R');
  t.is(result.things[0].start, "Discard pile");

  t.is(result.things[0].destination, 'P');
});

test('Move - move into a forest', t => {

  const result = parseAction('p->1_2_5_6_11_12', 'V' as RootFaction);
  console.log(result.things)

  t.is(result.things[0].number, 1);
  t.is((result.things[0].thing as RootPiece).faction, 'V');
  t.is((result.things[0].thing as RootPiece).pieceType, 'p');
  t.is(result.things[0].start, null);

  t.deepEqual(result.things[0].destination, { clearings: [1, 2, 5, 6, 11, 12] });
});