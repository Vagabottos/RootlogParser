import test from 'ava-ts';

import { parsePool } from '../src/parsers';

test('Pool parses correctly', t => {

  t.deepEqual(parsePool('Pool: CEAV'), ['C', 'E', 'A', 'V']);
  t.deepEqual(parsePool('Pool:CEAV'), ['C', 'E', 'A', 'V']);
  t.deepEqual(parsePool('Pool: CEAV '), ['C', 'E', 'A', 'V']);
  t.deepEqual(parsePool(' Pool: CEAV '), ['C', 'E', 'A', 'V']);
  t.throws(() => parsePool('Pool: XKCD '));
});

