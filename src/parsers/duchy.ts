import { RootAction, RootFaction, RootFactionBoard, RootThing } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const SWAY_MINISTER_REGEX = formRegex('#<Minister|||swayedMinister>->$');

export function parseDuchyAction(action: string): RootAction {

  if (SWAY_MINISTER_REGEX.test(action)) {
    const result = action.match(SWAY_MINISTER_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.swayedMinister },
        start: null,
        destination: {faction: RootFaction.Duchy} as RootFactionBoard
      } as RootThing]
    };
  }

  return null;

}
