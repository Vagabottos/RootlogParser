import test from 'ava-ts';

import { parseMap } from '../src/parsers';

test('Map parser gets a clearing', t => {

  t.true(parseMap('Map: Fall') === 'Fall');
  t.true(parseMap('Map:Fall') === 'Fall');
  t.true(parseMap('Map: Fall ') === 'Fall');
  t.true(parseMap(' Map: Fall ') === 'Fall');
  t.false(parseMap('Map Fall ') === 'Fall');

});