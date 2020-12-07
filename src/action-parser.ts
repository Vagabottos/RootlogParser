import { Action, ActionClearPath, ActionCombat, ActionCraft, ActionDominance, ActionGainVP, ActionMove, ActionReveal, ActionTriggerPlot, ActionUpdateFunds, Card, Faction, Item, Suit } from './interfaces';
import { parseConspiracyAction, parseCultAction, parseDuchyAction, parseEyrieAction, parseMarquiseAction, parseRiverfolkAction, parseVagabondAction, parseWoodlandAction } from './parsers';
import { splitAction } from './utils/action-splitter';
import { formRegex } from './utils/regex-former';

// These do not work on composite actions! Please first decompose actions like (t1+t2)->5 into simple actions with the actionSplitter
const COMBAT_REGEX = formRegex('[Faction|||attacker]X<Faction|||defender><Clearing|||battleClearing>[<Suit|||defenderAmbush>@[<Suit|||attackerAmbush>@]][(<Roll|||attackerRoll>,<Roll|||defenderRoll>)]');
const REVEAL_REGEX = formRegex('[Number|||countRevealed][Card|||cardRevealed][Faction|||revealingFaction]^[Faction|||revealedFaction]');
const SCORE_VP_REGEX = formRegex('[Faction|||scoringFaction]++[Number|||points]');
const REDUCE_VP_REGEX = formRegex('[Faction|||scoringFaction]--[Number|||points]');
const CRAFT_REGEX = formRegex('Z<Craftable|||crafted>');
const REMOVE_FACTION_MARKER_REGEX = formRegex('++-><FactionBoard|||targetFactionBoard>');
const CLEAR_MOUNTAIN_PATH_REGEX = formRegex('<Clearing|||lowerClearing>_<Clearing|||upperClearing>->');

const UPDATE_RELATIONSHIP_REGEX = formRegex('[Faction|||vagabondFaction]$_<Faction|||relationshipFaction>-><Relationship|||updatedRelationship>')
const UPDATE_FUNDS_REGEX = formRegex('$_f-><Number|||fundsRemaining>');
const EXPOSE_PLOT_REGEX = formRegex('?P<Piece|||plotGuessed><Clearing|||plotClearing>');
const FLIP_RAID_PLOT_REGEX = formRegex('Pt<Clearing|||plotClearing>^t_r');
const PRICE_OF_FAILURE_REGEX = formRegex('#<Minister|||lostMinister>D$->');

export const MOVE_REGEX = formRegex('[Number|||countMoved]<Component|||componentMoved>[Location|||origin]->[Location|||destination]');

// Allows movement to/from faction-specific locations: Item locations + Quests, The Burrow, as well as generic locations
const EXTENDED_MOVE_REGEX = formRegex('[Number|||countMoved]<Component|||componentMoved>[ExtendedLocation|||origin]->[ExtendedLocation|||destination]');

// TODO: Cleanup, or else find a way to implement with value in the future
// function getDefaultOrigin(component: Piece | Card | Item, movingFaction: Faction): Location {
//   if (Object.keys(Piece).find(key => Piece[key] === component)) {
//     if (component === 'p') {
//       // default pawn origin is its current location
//       return null;  // TODO: Fix
//     }
//     // default non-pawn piece origin is the supply
//     return { faction: movingFaction } as Location;
//   } else if (Object.keys(Card).find(key => Piece[key] === component)) {
//     // default card origin is
//     return { faction: movingFaction } as Location;
//   }
// }

// parse a VP action, defaults to +1
function parseVP(action: string, currentFaction: Faction): ActionGainVP {
  const result = action.match(SCORE_VP_REGEX);

  return {
    faction: (result.groups.scoringFaction as Faction) || currentFaction,
    vp: +result.groups.points || 1
  };
}

// parse a VP reduction action, defaults to -1
function parseLoseVP(action: string, currentFaction: Faction): ActionGainVP {
  const result = action.match(REDUCE_VP_REGEX);

  return {
    faction: (result.groups.scoringFaction as Faction) || currentFaction,
    vp: -result.groups.points || -1
  };
}

// parse a dominance action
function parseDominance(action: string, takingFaction: Faction): ActionDominance {
  const result = action.match(REMOVE_FACTION_MARKER_REGEX);

  return { target: result.groups.targetFactionBoard ? result.groups.targetFactionBoard[0] as Faction : takingFaction };
}

// parse a craft card or item
function parseCraft(action: string): ActionCraft {
  const result = action.match(CRAFT_REGEX);

  // craft an item
  if(result.groups.crafted[0] === '%') {
    return { craftItem: result.groups.crafted as Item };
  }

  // craft a card
  return { craftCard: result.groups.crafted as Card };
}

// parse a combat action
function parseCombat(action: string, takingFaction: Faction): ActionCombat {
  const result = action.match(COMBAT_REGEX);
  const parsedAction: ActionCombat = {
    attacker: (result.groups.attacker || takingFaction) as Faction,
    defender: result.groups.defender as Faction,
    clearing: +result.groups.battleClearing
  }
  if (result.groups.defenderAmbush != null) {
    parsedAction.ambush = result.groups.defenderAmbush as Suit;
  }
  if (result.groups.attackerAmbush != null) {
    parsedAction.ambush = result.groups.attackerAmbush as Suit;
  }
  
  return parsedAction;
}

// parse a move action
export function parseMove(action: string, takingFaction: Faction): ActionMove {

  const actions = splitAction(action);
  const movingComponents = [];
  let origin;
  let destination;

  for (let simpleAction of actions) {
    const result = simpleAction.match(EXTENDED_MOVE_REGEX);
    const number = +(result.groups.countMoved || 1);
    const component = result.groups.componentMoved;
    // TODO: This only works if all pieces in the action are going from the same origin to the same destination
    // FIX THIS SO IT WORKS FOR, e.g., w->1+2+3
    origin = origin || result.groups.origin;  // TODO: Add default: deck, current pawn location, supply, or current faction board
    destination = destination || result.groups.destination;  // TODO: Add default: discard pile, supply, or removed from game

    for (let i = 0; i < number; i++) {
      movingComponents.push(component);
    }
  }

  return {
    things: movingComponents,
    start: origin,
    end: destination
  };

}

function parseCard(card: string): Card {
    if (!card.includes('#')) {
        return null;
    }

    const cardParts = card.split('#');

    return {
        suit: (cardParts[0] || null) as Suit,
        cardName: cardParts[1] || null
    };
}

// parse a reveal action
export function parseReveal(action: string, takingFaction: Faction): ActionReveal {

  const actions = splitAction(action);
  const subjectsRevealed = [];
  const targets = [];

  for (let simpleAction of actions) {
    if (!REVEAL_REGEX.test(simpleAction)) {
      return;
    }
    const result = simpleAction.match(REVEAL_REGEX);
    const subject = {
      number: result.groups.cardRevealed ? +(result.groups.countRevealed || 1) : null,
      card: result.groups.cardRevealed ? parseCard(result.groups.cardRevealed) : null,
      revealer: (result.groups.revealingFaction || takingFaction) as Faction
    };

    subjectsRevealed.push(subject);
    targets.push(result.groups.revealedFaction || null);
  }

  return {
    subjects: subjectsRevealed,
    targets: targets
  };

}

// parse a clear mountain path action
export function parseClearMountainPath(action: string): ActionClearPath {

  const result = action.match(CLEAR_MOUNTAIN_PATH_REGEX);

  return {
    clearings: [+result.groups.lowerClearing, +result.groups.upperClearing]
  };

}

export function parseUpdateRelationshipAction(action: string, takingFaction: Faction): ActionMove {

  if (UPDATE_RELATIONSHIP_REGEX.test(action)) {
    const result = action.match(UPDATE_RELATIONSHIP_REGEX);
    const vagabondFaction = result.groups.vagabondFaction || takingFaction;
    const relationshipFaction = result.groups.relationshipFaction;
    const relationshipLevel = result.groups.updatedRelationship;

    return {
      things: [relationshipFaction as Card],  // TODO: Fix the 'as Card' duct tape
      start: vagabondFaction,
      end: relationshipLevel
    };
  }

}

export function parseUpdateFundsAction(action: string): ActionUpdateFunds {

  if (UPDATE_FUNDS_REGEX.test(action)) {
    const result = action.match(UPDATE_FUNDS_REGEX);

    return {
      funds: +result.groups.fundsRemaining
    };
  }

}

export function parsePriceOfFailureAction(action: string): ActionMove {

  if (PRICE_OF_FAILURE_REGEX.test(action)) {
    const result = action.match(PRICE_OF_FAILURE_REGEX);

    return {
      things: [result.groups.lostMinister as Card],
      start: Faction.Duchy,
      end: null
    };
  }

  return null;

}

export function parsePlotAction(action: string): ActionTriggerPlot {

  if (EXPOSE_PLOT_REGEX.test(action)) {
    const result = action.match(EXPOSE_PLOT_REGEX);

    return {
      plot: result.groups.plotGuessed,
      clearing: +result.groups.plotClearing
    };
  }

  if (FLIP_RAID_PLOT_REGEX.test(action)) {
    const result = action.match(FLIP_RAID_PLOT_REGEX);

    return {
      plot: 't_r',
      clearing: +result.groups.plotClearing
    };
  }

  return null;

}

// parse out an action 
export function parseAction(action: string, faction: Faction): Action {

  let parsedAction;

  // Check faction-specific actions first, in case they have to handle special movement rules (such as Vagabond/Duchy)
  switch(faction) {
    case 'C':
      parsedAction = parseMarquiseAction(action);
      break;
    case 'E':
      parsedAction = parseEyrieAction(action);
      break;
    case 'A':
      parsedAction = parseWoodlandAction(action);
      break;
    case 'V':
    case 'G':
      parsedAction = parseVagabondAction(action, faction);  // Vagabond gets the faction as an argument too, to distinguish V/G
      break;
    case 'L':
      parsedAction = parseCultAction(action);
      break;
    case 'O':
      parsedAction = parseRiverfolkAction(action);
      break;
    case 'D':
      parsedAction = parseDuchyAction(action);
      break;
    case 'P':
      parsedAction = parseConspiracyAction(action);
      break;
    default:
      break;
  }

  if (parsedAction != null) {
    return parsedAction;
  }

  if(action.includes('++') && !action.includes('->')) {
    return parseVP(action, faction);
  }

  if(action.includes('--')) {
    return parseLoseVP(action, faction);
  }

  if(action.includes('++') && action.includes('->')) {
    return parseDominance(action, faction);
  }

  if(action.startsWith('Z')) {
    return parseCraft(action);
  }

  if(COMBAT_REGEX.test(action)) {
    return parseCombat(action, faction);
  }

  if(action.includes('^')) {
    return parseReveal(action, faction);
  }

  if(CLEAR_MOUNTAIN_PATH_REGEX.test(action)) {
    return parseClearMountainPath(action);
  }

  if(UPDATE_RELATIONSHIP_REGEX.test(action)) {
    return parseUpdateRelationshipAction(action, faction);
  }

  if(UPDATE_FUNDS_REGEX.test(action)) {
    return parseUpdateFundsAction(action);
  }

  if(PRICE_OF_FAILURE_REGEX.test(action)) {
    return parsePriceOfFailureAction(action);
  }

  if(EXPOSE_PLOT_REGEX.test(action) || FLIP_RAID_PLOT_REGEX.test(action)) {
    return parsePlotAction(action);
  }

  if(action.includes('->')) {
    return parseMove(action, faction);
  }

  console.error(`Could not parse action: "${action}" (${faction}) - no handlers for this.`);
      // throw new Error(`Could not parse action: "${action}" - no handlers for this.`);

}