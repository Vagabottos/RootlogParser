import test from 'ava-ts';
import { parseWinner } from '../src/parsers';

test('Map parser gets a winner', t => {

  t.deepEqual(parseWinner('Winner: C'), ['C']);
  t.deepEqual(parseWinner('Winner:C'), ['C']);
  t.deepEqual(parseWinner('Winner: C '), ['C']);
  t.deepEqual(parseWinner(' Winner: C '), ['C']);
  t.notDeepEqual(parseWinner('Winner C '), ['C']);

  t.deepEqual(parseWinner('Winner:CG'), ['C', 'G']);

});
