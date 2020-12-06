import test from 'ava-ts';

import { formRegex } from '../src/utils/regex-former';

test('Correctly forms regex for crafting cards', t => {

  const craftingRegex = formRegex('Z<Craftable|||crafted>');
  let result = 'Ztun'.match(craftingRegex);
  t.is(result.groups.crafted, 'tun');
  
  result = 'Zprop'.match(craftingRegex);
  t.is(result.groups.crafted, 'prop');
  
  result = 'Z@'.match(craftingRegex);
  t.is(result.groups.crafted, '@');

});

test('Correctly forms regex for crafting items', t => {

  const craftingRegex = formRegex('Z<Craftable|||crafted>');
  let result = 'Z%t'.match(craftingRegex);
  t.is(result.groups.crafted, '%t');
  
  result = 'Z%x'.match(craftingRegex);
  t.is(result.groups.crafted, '%x');
  
  result = 'Z%s'.match(craftingRegex);
  t.is(result.groups.crafted, '%s');

});

test('Does not forms regex for crafting cards with invalid names', t => {

  const craftingRegex = formRegex('Z<Craftable|||crafted>');
  let result = 'Zambush'.match(craftingRegex);
  t.is(result, null);
  
  result = 'ZTun'.match(craftingRegex);
  t.is(result, null);
  
  result = 'Z tun'.match(craftingRegex);
  t.is(result, null);

});

test('Does not forms regex for crafting cards with invalid item types', t => {

  const craftingRegex = formRegex('Z<Craftable|||crafted>');
  let result = 'Z%q'.match(craftingRegex);
  t.is(result, null);
  
  result = 'Z%%t'.match(craftingRegex);
  t.is(result, null);
  
  result = 'Z%T'.match(craftingRegex);
  t.is(result, null);
  
  result = 'Z%'.match(craftingRegex);
  t.is(result, null);
  
  result = 'Z %t'.match(craftingRegex);
  t.is(result, null);

});

test('Correctly forms regex for scoring victory points', t => {

  const pointsRegex = formRegex('[Faction|||scoringFaction]++[Number|||points]');
  let result = 'C++1'.match(pointsRegex);
  t.is(result.groups.scoringFaction, 'C');
  t.is(result.groups.points, '1');
  
  result = '++4'.match(pointsRegex);
  t.is(result.groups.scoringFaction, undefined);
  t.is(result.groups.points, '4');
  
  result = '++'.match(pointsRegex);
  t.is(result.groups.scoringFaction, undefined);
  t.is(result.groups.points, undefined);

});

test('Correctly forms regex for losing victory points', t => {

  const pointsRegex = formRegex('[Faction|||scoringFaction]--[Number|||points]');
  let result = 'C--1'.match(pointsRegex);
  t.is(result.groups.scoringFaction, 'C');
  t.is(result.groups.points, '1');
  
  result = '--4'.match(pointsRegex);
  t.is(result.groups.scoringFaction, undefined);
  t.is(result.groups.points, '4');
  
  result = '--'.match(pointsRegex);
  t.is(result.groups.scoringFaction, undefined);
  t.is(result.groups.points, undefined);

});

test('Correctly forms regex for moving a VP marker to a faction board', t => {

  const movingVPMarkerRegex = formRegex('++-><FactionBoard|||targetFaction>');
  let result = '++->C$'.match(movingVPMarkerRegex);
  t.is(result.groups.targetFaction, 'C$');
  
  result = '++->$'.match(movingVPMarkerRegex);
  t.is(result.groups.targetFaction, '$');

});

test('Correctly forms regex for opening a closed path', t => {

  const clearMountainPathRegex = formRegex('<Clearing|||lowerClearing>_<Clearing|||upperClearing>->');
  let result = '3_7->'.match(clearMountainPathRegex);
  t.is(result.groups.lowerClearing, '3');
  t.is(result.groups.upperClearing, '7');
  
  result = '6_11->'.match(clearMountainPathRegex);
  t.is(result.groups.lowerClearing, '6');
  t.is(result.groups.upperClearing, '11');
  
  result = '11_12->'.match(clearMountainPathRegex);
  t.is(result.groups.lowerClearing, '11');
  t.is(result.groups.upperClearing, '12');

});

test('Correctly forms regex for revealing cards', t => {

  const revealRegex = formRegex('[Number|||countRevealed][Card|||cardRevealed][Faction|||revealingFaction]^[Faction|||revealedFaction]');
  let result = '2B#C^A'.match(revealRegex);
  t.is(result.groups.countRevealed, '2');
  t.is(result.groups.cardRevealed, 'B#');
  t.is(result.groups.revealingFaction, 'C');
  t.is(result.groups.revealedFaction, 'A');
  
  result = '#tunC^'.match(revealRegex);
  t.is(result.groups.countRevealed, undefined);
  t.is(result.groups.cardRevealed, '#tun');
  t.is(result.groups.revealingFaction, 'C');
  t.is(result.groups.revealedFaction, undefined);

  result = 'F#@^'.match(revealRegex);
  t.is(result.groups.countRevealed, undefined);
  t.is(result.groups.cardRevealed, 'F#@');
  t.is(result.groups.revealingFaction, undefined);
  t.is(result.groups.revealedFaction, undefined);

  result = '^A'.match(revealRegex);
  t.is(result.groups.countRevealed, undefined);
  t.is(result.groups.cardRevealed, undefined);
  t.is(result.groups.revealingFaction, undefined);
  t.is(result.groups.revealedFaction, 'A');

  result = 'F#^P'.match(revealRegex);
  t.is(result.groups.countRevealed, undefined);
  t.is(result.groups.cardRevealed, 'F#');
  t.is(result.groups.revealingFaction, undefined);
  t.is(result.groups.revealedFaction, 'P');

  result = '2M#^'.match(revealRegex);
  t.is(result.groups.countRevealed, '2');
  t.is(result.groups.cardRevealed, 'M#');
  t.is(result.groups.revealingFaction, undefined);
  t.is(result.groups.revealedFaction, undefined);

  result = 'V^O'.match(revealRegex);
  t.is(result.groups.countRevealed, undefined);
  t.is(result.groups.cardRevealed, undefined);
  t.is(result.groups.revealingFaction, 'V');
  t.is(result.groups.revealedFaction, 'O');

});

test('Correctly forms regex for moving pieces', t => {

  const moveRegex = formRegex('[Number|||countMoved]<Component|||componentMoved>[Location|||origin]->[Location|||destination]');
  let result = '2Dw3->5'.match(moveRegex);
  t.is(result.groups.countMoved, '2');
  t.is(result.groups.componentMoved, 'Dw');
  t.is(result.groups.origin, '3');
  t.is(result.groups.destination, '5');

  result = '4w10->4'.match(moveRegex);
  t.is(result.groups.countMoved, '4');
  t.is(result.groups.componentMoved, 'w');
  t.is(result.groups.origin, '10');
  t.is(result.groups.destination, '4');
  
  result = 'b->3'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, 'b');
  t.is(result.groups.origin, undefined);
  t.is(result.groups.destination, '3');

  result = 'p->12'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, 'p');
  t.is(result.groups.origin, undefined);
  t.is(result.groups.destination, '12');

  result = 'At->5'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, 'At');
  t.is(result.groups.origin, undefined);
  t.is(result.groups.destination, '5');

});

test('Correctly forms regex for moving cards', t => {

  const moveRegex = formRegex('[Number|||countMoved]<Component|||componentMoved>[Location|||origin]->[Location|||destination]');
  let result = 'F#domO->C'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, 'F#dom');
  t.is(result.groups.origin, 'O');
  t.is(result.groups.destination, 'C');

  result = '#V->P'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '#');
  t.is(result.groups.origin, 'V');
  t.is(result.groups.destination, 'P');
  
  result = 'F#C->'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, 'F#');
  t.is(result.groups.origin, 'C');
  t.is(result.groups.destination, undefined);

  result = '#->C'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '#');
  t.is(result.groups.origin, undefined);
  t.is(result.groups.destination, 'C');

  result = '3#A->$'.match(moveRegex);
  t.is(result.groups.countMoved, '3');
  t.is(result.groups.componentMoved, '#');
  t.is(result.groups.origin, 'A');
  t.is(result.groups.destination, '$');

  result = '3F#$->'.match(moveRegex);
  t.is(result.groups.countMoved, '3');
  t.is(result.groups.componentMoved, 'F#');
  t.is(result.groups.origin, '$');
  t.is(result.groups.destination, undefined);

  result = '#E->A$'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '#');
  t.is(result.groups.origin, 'E');
  t.is(result.groups.destination, 'A$');

});

test('Correctly forms regex for moving items', t => {

  const moveRegex = formRegex('[Number|||countMoved]<Component|||componentMoved>[Location|||origin]->[Location|||destination]');
  let result = '%sO$->V$'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '%s');
  t.is(result.groups.origin, 'O$');
  t.is(result.groups.destination, 'V$');

  result = '%s12->$'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '%s');
  t.is(result.groups.origin, '12');
  t.is(result.groups.destination, '$');
  
  result = '%s->e'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '%s');
  t.is(result.groups.origin, undefined);
  t.is(result.groups.destination, 'e');

  result = '%fe->'.match(moveRegex);
  t.is(result.groups.countMoved, undefined);
  t.is(result.groups.componentMoved, '%f');
  t.is(result.groups.origin, 'e');
  t.is(result.groups.destination, undefined);

});