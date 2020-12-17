import { RootAction, RootSuit } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const SET_OUTCAST_REGEX = formRegex('$_<Outcast|||outcastDegree>-><Suit|||outcastSuit>');

export function parseCultAction(action: string): RootAction {

  if (SET_OUTCAST_REGEX.test(action)) {
    const result = action.match(SET_OUTCAST_REGEX);

    return {
      isHated: (result.groups.outcastDegree === 'ho'),
      suit: result.groups.outcastSuit as RootSuit
    };
  }

  return null;

}
