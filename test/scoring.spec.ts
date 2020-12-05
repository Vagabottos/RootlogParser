import test from 'ava-ts';

import { parseVP } from '../src/action-parser';
import { Faction } from '../src/interfaces/rootgame';

test('Gain VP action parses all parts correctly together', t => {

  const result = parseVP('A++2', 'E' as Faction);

  t.is(result.vp, 2);
  t.is(result.faction, 'A');
});

test('Gain VP action parses default faction', t => {

  const result = parseVP('++2', 'E' as Faction);

  t.is(result.vp, 2);
  t.is(result.faction, 'E');
});

test('Gain VP action parses default number of points', t => {

  const result = parseVP('A++', 'E' as Faction);

  t.is(result.vp, 1);
  t.is(result.faction, 'A');
});

test('Gain VP action parses all defaults correctly together', t => {

  const result = parseVP('++', 'E' as Faction);

  t.is(result.vp, 1);
  t.is(result.faction, 'E');
});