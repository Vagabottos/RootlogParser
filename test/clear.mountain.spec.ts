import test from 'ava-ts';

import { parseClearMountainPath } from '../src/action-parser';

test('Correctly parses action to clear a mountain path', t => {

  const result = parseClearMountainPath('3_7->');

  t.deepEqual(result.clearings, [3, 7]);
});

test('Correctly parses action to clear a mountain path with multiple digits', t => {

  const result = parseClearMountainPath('6_11->');

  t.deepEqual(result.clearings, [6, 11]);
});