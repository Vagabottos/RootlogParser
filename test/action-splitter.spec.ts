import test from 'ava-ts';

import { splitAction } from '../src/utils/action-splitter';

test('Correctly splits apart actions where the same components are moved to multiple locations', t => {

  let actions = splitAction('w->3+11');
  t.deepEqual(actions, ['w->3', 'w->11']);

});

test('Correctly splits apart actions where multiple components are moved to the same locations', t => {

  let actions = splitAction('t1+t2+t5->');
  t.deepEqual(actions, ['t1->', 't2->', 't5->']);

  actions = splitAction('w+t_r->10');
  t.deepEqual(actions, ['w->10', 't_r->10']);

  actions = splitAction('%h+%c+%s->r');
  t.deepEqual(actions, ['%h->r', '%c->r', '%s->r']);

});

test('Correctly splits apart actions where multiple components are revealed to the same target', t => {

  let actions = splitAction('F#+2M#^');
  t.deepEqual(actions, ['F#^', '2M#^']);

  actions = splitAction('2F#+M#^A');
  t.deepEqual(actions, ['2F#^A', 'M#^A']);

});

test('Correctly splits apart actions where multiple components in the same action are grouped', t => {

  let actions = splitAction('(w+2Cw+Cb_s)3->');
  t.deepEqual(actions, ['w3->', '2Cw3->', 'Cb_s3->']);

  actions = splitAction('(2R+B)#A$->');
  t.deepEqual(actions, ['2R#A$->', 'B#A$->']);

  actions = splitAction('(2%c+%h)$V->d');
  t.deepEqual(actions, ['2%c$V->d', '%h$V->d']);

});