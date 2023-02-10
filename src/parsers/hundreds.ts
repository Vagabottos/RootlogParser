import { RootAction, RootFaction, RootFactionBoard } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const CHOOSE_MOOD_REGEX = formRegex('#<Mood|||chosenMood>->$');

export function parseHundredsAction(action: string): RootAction {
  if (CHOOSE_MOOD_REGEX.test(action)) {
    const result = action.match(CHOOSE_MOOD_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.chosenMood },
        start: null,
        destination: {faction: RootFaction.Hundreds} as RootFactionBoard
      }]
    };
  }

  return null;
}
