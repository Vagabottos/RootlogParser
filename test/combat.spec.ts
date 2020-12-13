import test from 'ava-ts';

import { parseAction, parseCombat } from '../src/action-parser';
import { RootFaction } from '../src/interfaces/rootgame';

test('Combat action parses all parts correctly together', t => {

  const result = parseAction('CXE8F@B@', 'V' as RootFaction); // That dastardly Vagrant...

  t.is(result.attacker, 'C');
  t.is(result.defender, 'E');
  t.is(result.clearing, 8);
  t.is(result.ambush, 'F');
  t.is(result.foilAmbush, 'B');
});

test('Combat action parses all parts correctly together without ambushes', t => {

  const result = parseAction('CXE8', 'V' as RootFaction); // That dastardly Vagrant...

  t.is(result.attacker, 'C');
  t.is(result.defender, 'E');
  t.is(result.clearing, 8);
  t.is(result.ambush, null);
  t.is(result.foilAmbush, null);
});

test('Combat action parses default attacker correctly', t => {

  const result = parseAction('XA12', 'O' as RootFaction);

  t.is(result.attacker, 'O');
  t.is(result.defender, 'A');
  t.is(result.clearing, 12);
});

test('Combat action parses ambushes correctly with default attacker', t => {

  const result = parseAction('XA11B@M@', 'E' as RootFaction);

  t.is(result.attacker, 'E');
  t.is(result.defender, 'A');
  t.is(result.clearing, 11);
  t.is(result.ambush, 'B');
  t.is(result.foilAmbush, 'M');
});

test('Combat action parses ambushes without foil ambush correctly', t => {

  const result = parseAction('XA11R@', 'E' as RootFaction);

  t.is(result.attacker, 'E');
  t.is(result.defender, 'A');
  t.is(result.clearing, 11);
  t.is(result.ambush, 'R');
  t.is(result.foilAmbush, null);
});
