import test from 'ava-ts';

import { parseUpdateFundsAction } from '../src/action-parser';

test('Correctly parses an action to update funds', t => {

  const result = parseUpdateFundsAction('$_f->0');

  t.is(result.funds, 0);
});