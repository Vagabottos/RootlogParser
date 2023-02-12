import { parseCard } from '../action-parser';
import { RootAction, RootActionMove, RootActionType, RootCardName, RootFaction, RootFactionBoard, RootThing } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const FLIP_RELIC_REGEX = formRegex('t<Clearing|||relicClearing>^<Piece|||relicFlipped>');
const ADD_TO_RETINUE_REGEX = formRegex('[Number|||countAdded]<Card|||cardAdded>K->$_<Retinue|||columnAdded>')
const DISCARD_FROM_RETINUE_REGEX = formRegex('<Card|||cardDiscarded>$_<Retinue|||columnDiscarded>->')

export function parseAddToRetinue(actions: string[]): RootActionMove {

  const movingComponents = [];

  for (let action of actions) {
    const result = action.match(ADD_TO_RETINUE_REGEX);
    const component = {
      number: +(result.groups.countAdded || 1),
      thing: parseCard(result.groups.cardAdded),
      start: RootFaction.Keepers,
      destination: {
        faction: RootFaction.Keepers,
        sublocation: +result.groups.columnAdded,
      }
    };

    movingComponents.push(component);
  }

  return {
    things: movingComponents
  };

}

export function parseKeepersAction(action: string): RootAction {

  if (FLIP_RELIC_REGEX.test(action)) {
    const result = action.match(FLIP_RELIC_REGEX);

    return {
      type: RootActionType.FlipRelic,
      relic: result.groups.relicFlipped,
      clearing: +result.groups.relicClearing
    };
  }

  if (DISCARD_FROM_RETINUE_REGEX.test(action)) {
    const result = action.match(DISCARD_FROM_RETINUE_REGEX);
    const card = parseCard(result.groups.cardDiscarded);

    return {
      things: [{
        number: 1,
        thing: card,
        start: {
          faction: RootFaction.Keepers,
          sublocation: +result.groups.columnDiscarded
        },
        destination: (card.cardName === RootCardName.FaithfulRetainer) ? null : 'Discard pile'
      }]
    }
  }

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => ADD_TO_RETINUE_REGEX.test(act))) {
    return parseAddToRetinue(simpleActions);
  }

  return null;

}
