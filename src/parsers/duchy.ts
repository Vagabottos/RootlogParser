import { Action, RootFaction, RootFactionBoard, Thing } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const SWAY_MINISTER_REGEX = formRegex('#<Minister|||swayedMinister>->$');

export function parseDuchyAction(action: string): Action {

  if (SWAY_MINISTER_REGEX.test(action)) {
    const result = action.match(SWAY_MINISTER_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.swayedMinister },
        start: null
      } as Thing],
      destinations: [{faction: RootFaction.Duchy} as RootFactionBoard]
    };
  }

  return null;

}
