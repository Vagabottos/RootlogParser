import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootFaction, RootFactionBoard, RootVagabondRelationshipStatus } from '../src/interfaces';

test('Correctly parses an action to update a relationship to another number', t => {

  const result = parseAction('V$_A->1', 'V' as RootFaction);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, {faction: RootFaction.Woodland, piece: 'A'});
  t.deepEqual(result.things[0].start, {faction: 'V' as RootFaction} as RootFactionBoard);
  t.is(result.things[0].destination, RootVagabondRelationshipStatus.IndifferentPlusOne);
});

test('Correctly parses an action to update a relationship to a letter', t => {

  const result = parseAction('G$_A->a', RootFaction.Vagabond);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: RootFaction.Woodland, piece: 'A'});
  t.deepEqual(result.things[0].start, {faction: 'G' as RootFaction} as RootFactionBoard);
  t.is(result.things[0].destination, RootVagabondRelationshipStatus.Allied);
});

test('Correctly parses an action to update a relationship using default values', t => {

  const result = parseAction('$_A->a', RootFaction.Vagabond);

  t.is(result.things[0].number, 1);
  t.deepEqual(result.things[0].thing, { faction: RootFaction.Woodland, piece: 'A'});
  t.deepEqual(result.things[0].start, {faction: 'V' as RootFaction} as RootFactionBoard);
  t.is(result.things[0].destination, RootVagabondRelationshipStatus.Allied);
});