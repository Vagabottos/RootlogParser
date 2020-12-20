import { parseLocation } from '../action-parser';
import { RootAction, RootFaction, RootFactionBoard, RootThing } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const CHOOSE_CHARACTER_REGEX = formRegex('#<Character|||chosenCharacter>->$');
const RESTORE_ITEMS_REGEX = formRegex('%_d-><ExtendedLocation|||restoredLocation>');

export function parseVagabondAction(action: string, faction: RootFaction): RootAction {

  if (CHOOSE_CHARACTER_REGEX.test(action)) {
    const result = action.match(CHOOSE_CHARACTER_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.chosenCharacter },
        start: null,
        destination: {faction: faction} as RootFactionBoard
      }]
    };
  }

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => RESTORE_ITEMS_REGEX.test(act))) {

    const movingComponents = [];
    for (let simpleAction of simpleActions) {
      const result = simpleAction.match(RESTORE_ITEMS_REGEX);

      movingComponents.push({
        number: -1,
        thing: null,
        start: {faction: faction} as RootFactionBoard,
        destination: parseLocation(result.groups.restoredLocation, faction)
      } as RootThing);
    }

    return {
      things: movingComponents
    };

  }
}