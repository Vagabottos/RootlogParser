import test from 'ava-ts';

import { parsePool } from '../src/parsers';

test('Pool parser gets a clearing', t => {

  t.deepEqual(parsePool('Pool: CEWV'), ['C', 'E', 'W', 'V']);
  t.deepEqual(parsePool('Pool:CEWV'), ['C', 'E', 'W', 'V']);
  t.deepEqual(parsePool('Pool: CEWV '), ['C', 'E', 'W', 'V']);
  t.deepEqual(parsePool(' Pool: CEWV '), ['C', 'E', 'W', 'V']);
  t.notDeepEqual(parsePool('Pool CEWV '), ['C', 'E', 'W', 'V']);

});

