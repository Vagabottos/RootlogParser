import test from 'ava-ts';

import { parseMap } from '../src/parsers';

test('Map parser gets a map name', t => {

  t.true(parseMap('Map: Fall') === 'Fall');
  t.true(parseMap('Map:Fall') === 'Fall');
  t.true(parseMap('Map: Fall ') === 'Fall');
  t.true(parseMap(' Map: Fall ') === 'Fall');
  t.throws(() => parseMap('Map Fall '));
});
