import { Action, Card, Faction } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const CHOOSE_CHARACTER_REGEX = formRegex('#<Character|||chosenCharacter>->$');
const RESTORE_ITEMS_REGEX = formRegex('$_d-><ExtendedLocation|||restoredLocation>');

export function parseVagabondAction(action: string, faction: Faction): Action {

  if (CHOOSE_CHARACTER_REGEX.test(action)) {
    const result = action.match(CHOOSE_CHARACTER_REGEX);

    return {
      things: [result.groups.chosenCharacter as Card],
      start: null,
      end: faction
    };
  }

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => RESTORE_ITEMS_REGEX.test(act))) {

    return {
      things: [],   // all damaged items
      start: null,  // damages
      end: null     // track and satchel
    };
  }

  return null;

}