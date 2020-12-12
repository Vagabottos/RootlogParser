import test from 'ava-ts';

import { ActionSwapPlots, ActionTriggerPlot } from '../src/interfaces';
import { parseConspiracyAction } from '../src/parsers';
import { parsePlotAction } from '../src/action-parser';

test('Correctly parses an action to attempt to expose a plot', t => {

  const result = parsePlotAction('?Pt_r5');

  t.is(result.plot, 't_r');
  t.is(result.clearing, 5);
});

test('Correctly parses an action to attempt to expose a plot in a clearing with multiple digits', t => {

  const result = parsePlotAction('?Pt_e11');

  t.is(result.plot, 't_e');
  t.is(result.clearing, 11);
});

test('Correctly parses an action to trigger a raid plot', t => {

  const result = parsePlotAction('Pt3^t_r');

  t.is(result.plot, 't_r');
  t.is(result.clearing, 3);
});

test('Correctly parses an action to trigger a raid plot in a clearing with multiple digits', t => {

  const result = parsePlotAction('Pt11^t_r');

  t.is(result.plot, 't_r');
  t.is(result.clearing, 11);
});

test('Correctly parses action to flip a plot', t => {

  const result = parseConspiracyAction('t6^t_e') as ActionTriggerPlot;

  t.is(result.clearing, 6);
  t.is(result.plot, 't_e');
});

test('Correctly parses action to flip a plot in a clearing with multiple digits', t => {

  const result = parseConspiracyAction('t11^t_e') as ActionTriggerPlot;

  t.is(result.clearing, 11);
  t.is(result.plot, 't_e');
});

test('Correctly parses action to swap plots', t => {

  const result = parseConspiracyAction('t1<->t9') as ActionSwapPlots;

  t.deepEqual(result.clearings, [1, 9]);
});

test('Correctly parses action to swap plots in clearings with multiple digits', t => {

  const result = parseConspiracyAction('t10<->t11') as ActionSwapPlots;

  t.deepEqual(result.clearings, [10, 11]);
});