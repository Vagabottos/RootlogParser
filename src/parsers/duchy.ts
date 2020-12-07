import { Action, Card, Faction } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const SWAY_MINISTER_REGEX = formRegex('#<Minister|||swayedMinister>->$');

export function parseDuchyAction(action: string): Action {

  if (SWAY_MINISTER_REGEX.test(action)) {
    const result = action.match(SWAY_MINISTER_REGEX);

    return {
      things: [result.groups.swayedMinister as Card],
      start: null,
      end: Faction.Duchy
    };
  }

  return null;

}
