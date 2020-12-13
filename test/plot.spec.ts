import test from 'ava-ts';

import { ActionSwapPlots, ActionTriggerPlot, Faction } from '../src/interfaces';
import { parseConspiracyAction } from '../src/parsers';
import { parseAction, parsePlotAction } from '../src/action-parser';

test('Correctly parses an action to attempt to expose a plot', t => {

  const result = parseAction('?Pt_r5', Faction.Marquise);

  t.is(result.plot, 't_r');
  t.is(result.clearing, 5);
});

test('Correctly parses an action to attempt to expose a plot in a clearing with multiple digits', t => {

  const result = parseAction('?Pt_e11', Faction.Marquise);

  t.is(result.plot, 't_e');
  t.is(result.clearing, 11);
});

test('Correctly parses an action to trigger a raid plot', t => {

  const result = parseAction('Pt3^t_r', Faction.Riverfolk);

  t.is(result.plot, 't_r');
  t.is(result.clearing, 3);
});

test('Correctly parses an action to trigger a raid plot in a clearing with multiple digits', t => {

  const result = parseAction('Pt11^t_r', Faction.Riverfolk);

  t.is(result.plot, 't_r');
  t.is(result.clearing, 11);
});

test('Correctly parses action to flip a plot', t => {

  const result = parseAction('t6^t_e', Faction.Corvid) as ActionTriggerPlot;

  t.is(result.clearing, 6);
  t.is(result.plot, 't_e');
});

test('Correctly parses action to flip a plot in a clearing with multiple digits', t => {

  const result = parseAction('t11^t_e', Faction.Corvid) as ActionTriggerPlot;

  t.is(result.clearing, 11);
  t.is(result.plot, 't_e');
});

test('Correctly parses action to swap plots', t => {

  const result = parseAction('t1<->t9', Faction.Corvid) as ActionSwapPlots;

  t.deepEqual(result.clearings, [1, 9]);
});

test('Correctly parses action to swap plots in clearings with multiple digits', t => {

  const result = parseAction('t10<->t11', Faction.Corvid) as ActionSwapPlots;

  t.deepEqual(result.clearings, [10, 11]);
});