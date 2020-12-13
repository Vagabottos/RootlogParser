import { RootAction, RootFaction, RootFactionBoard } from '../interfaces';
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

  if (simpleActions.every(act => RESTORE_ITEMS_REGEX.test(act))) {  // TODO: Can also represent 'damages all items'

    return {
      things: [],          // all damaged items move to satchel
    };
  }

  return null;

}