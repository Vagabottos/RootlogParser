import test from 'ava-ts';

import { parseCombat } from '../src/action-parser';
import { Faction } from '../src/interfaces/rootgame';

test('Combat action parses all parts correctly together', t => {

  const result = parseCombat('CXE8F@B@', 'V' as Faction); // That dastardly Vagrant...

  t.is(result.attacker, 'C');
  t.is(result.defender, 'E');
  t.is(result.clearing, 8);
  t.is(result.ambush, 'F');
  t.is(result.foilAmbush, 'B');
});

test('Combat action parses all parts correctly together without ambushes', t => {

  const result = parseCombat('CXE8', 'V' as Faction); // That dastardly Vagrant...

  t.is(result.attacker, 'C');
  t.is(result.defender, 'E');
  t.is(result.clearing, 8);
  t.is(result.ambush, undefined);
  t.is(result.foilAmbush, undefined);
});

test('Combat action parses default attacker correctly', t => {

  const result = parseCombat('XA12', 'O' as Faction);

  t.is(result.attacker, 'O');
  t.is(result.defender, 'A');
  t.is(result.clearing, 12);
});