import test from 'ava-ts';

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