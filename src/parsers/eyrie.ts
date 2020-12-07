import { Action, ActionMove, Card, Faction } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const PURGE_DECREE_REGEX = formRegex('$_->');
const CHOOSE_LEADER_REGEX = formRegex('#<Leader|||chosenLeader>->$');
const ADD_TO_DECREE_REGEX = formRegex('[Number|||countAdded]<Card|||cardAdded>E-><Decree|||columnAdded>')


function parseAddToDecree(actions: string[]): ActionMove {

  const movingComponents = [];
  let destination;

  for (let action of actions) {
    const result = action.match(ADD_TO_DECREE_REGEX);
    const number = result.groups.countAdded || 1;
    const component = result.groups.cardAdded;
    destination = destination || result.groups.destination;

    for (let i = 0; i < number; i++) {
      movingComponents.push(component);
    }
  }

  return {
    things: movingComponents,
    start: null,
    end: destination
  };

}

export function parseEyrieAction(action: string): Action {

  if (CHOOSE_LEADER_REGEX.test(action)) {
    const result = action.match(CHOOSE_LEADER_REGEX);

    return {
      things: [result.groups.chosenLeader as Card],
      start: null,
      end: Faction.Eyrie
    };
  }

  if (PURGE_DECREE_REGEX.test(action)) {
    return {
      things: [],  // TODO: All cards currently in Decree
      start: null, // TODO: Decree (column by column?)
      end: null    // TODO: Discard pile
    };
  }

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => ADD_TO_DECREE_REGEX.test(act))) {
    return parseAddToDecree(simpleActions);
  }

  return null;

}
