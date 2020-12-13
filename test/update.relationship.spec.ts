import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { Faction, VagabondRelationshipStatus } from '../src/interfaces';

test('Correctly parses an action to update a relationship to another number', t => {

  const result = parseAction('V$_A->1', 'V' as Faction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: 'A' as Faction, pieceType: null });
  t.is(result.things[0].start, 'V' as Faction);
  t.is(result.destinations[0], '1' as VagabondRelationshipStatus);
});

test('Correctly parses an action to update a relationship to a letter', t => {

  const result = parseAction('G$_A->a', 'V' as Faction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: 'A' as Faction, pieceType: null });
  t.is(result.things[0].start, 'G' as Faction);
  t.is(result.destinations[0], 'a' as VagabondRelationshipStatus);
});

test('Correctly parses an action to update a relationship using default values', t => {

  const result = parseAction('$_A->a', 'V' as Faction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: 'A' as Faction, pieceType: null });
  t.is(result.things[0].start, 'V' as Faction);
  t.is(result.destinations[0], 'a' as VagabondRelationshipStatus);
});