import { parseCard } from '../action-parser';
import { Action, ActionMove, Faction } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const PURGE_DECREE_REGEX = formRegex('$_->');
const CHOOSE_LEADER_REGEX = formRegex('#<Leader|||chosenLeader>->$');
const ADD_TO_DECREE_REGEX = formRegex('[Number|||countAdded]<Card|||cardAdded>E-><Decree|||columnAdded>')


function parseAddToDecree(actions: string[]): ActionMove {

  const movingComponents = [];
  const destinations = [];

  for (let action of actions) {
    const result = action.match(ADD_TO_DECREE_REGEX);
    const number = result.groups.countAdded || 1;
    const component = parseCard(result.groups.cardAdded);
    const destination = null;  // TODO: Destination is decree

    movingComponents.push(component);
    destinations.push(destination);
  }

  return {
    things: movingComponents,
    destinations: destinations
  };

}

export function parseEyrieAction(action: string): Action {

  if (CHOOSE_LEADER_REGEX.test(action)) {
    const result = action.match(CHOOSE_LEADER_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.chosenLeader },
        start: null
      }],
      destinations: [Faction.Eyrie]
    };
  }

  if (PURGE_DECREE_REGEX.test(action)) {
    return {
      things: [],         // TODO: All cards currently in Decree
      destinations: []    // TODO: Discard pile
    };
  }

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => ADD_TO_DECREE_REGEX.test(act))) {
    return parseAddToDecree(simpleActions);
  }

  return null;

}
