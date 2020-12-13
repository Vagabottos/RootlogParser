import { Action, RootSuit } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const SET_OUTCAST_REGEX = formRegex('$_<Outcast|||outcastDegree>-><Suit|||outcastSuit>');

export function parseCultAction(action: string): Action {

  if (SET_OUTCAST_REGEX.test(action)) {
    const result = action.match(SET_OUTCAST_REGEX);

    return {
      degree: result.groups.outcastDegree,
      suit: result.groups.outcastSuit as RootSuit
    };
  }

  return null;

}
