import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { Faction } from '../src/interfaces/rootgame';

test('Gain VP action parses all parts correctly together', t => {

  const result = parseAction('A++2', 'E' as Faction);

  t.is(result.vp, 2);
  t.is(result.faction, 'A');
});

test('Gain VP action parses default faction', t => {

  const result = parseAction('++2', 'E' as Faction);

  t.is(result.vp, 2);
  t.is(result.faction, 'E');
});

test('Gain VP action parses default number of points', t => {

  const result = parseAction('A++', 'E' as Faction);

  t.is(result.vp, 1);
  t.is(result.faction, 'A');
});

test('Gain VP action parses all defaults correctly together', t => {

  const result = parseAction('++', 'E' as Faction);

  t.is(result.vp, 1);
  t.is(result.faction, 'E');
});

test('Losing VP action parses all parts correctly together', t => {

  const result = parseAction('A--2', 'E' as Faction);

  t.is(result.vp, -2);
  t.is(result.faction, 'A');
});

test('Losing VP action parses default faction', t => {

  const result = parseAction('--2', 'E' as Faction);

  t.is(result.vp, -2);
  t.is(result.faction, 'E');
});

test('Losing VP action parses default number of points', t => {

  const result = parseAction('A--', 'E' as Faction);

  t.is(result.vp, -1);
  t.is(result.faction, 'A');
});

test('Losing VP action parses all defaults correctly together', t => {

  const result = parseAction('--', 'E' as Faction);

  t.is(result.vp, -1);
  t.is(result.faction, 'E');
});