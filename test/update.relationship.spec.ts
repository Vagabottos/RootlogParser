import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootFaction, RootVagabondRelationshipStatus } from '../src/interfaces';

test('Correctly parses an action to update a relationship to another number', t => {

  const result = parseAction('V$_A->1', 'V' as RootFaction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: 'A' as RootFaction, pieceType: null });
  t.is(result.things[0].start, 'V' as RootFaction);
  t.is(result.destinations[0], '1' as RootVagabondRelationshipStatus);
});

test('Correctly parses an action to update a relationship to a letter', t => {

  const result = parseAction('G$_A->a', 'V' as RootFaction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: 'A' as RootFaction, pieceType: null });
  t.is(result.things[0].start, 'G' as RootFaction);
  t.is(result.destinations[0], 'a' as RootVagabondRelationshipStatus);
});

test('Correctly parses an action to update a relationship using default values', t => {

  const result = parseAction('$_A->a', 'V' as RootFaction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: 'A' as RootFaction, pieceType: null });
  t.is(result.things[0].start, 'V' as RootFaction);
  t.is(result.destinations[0], 'a' as RootVagabondRelationshipStatus);
});