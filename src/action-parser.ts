import { RootActionClearPath, RootActionCombat, RootActionCraft, RootActionDominance, RootActionGainVP, RootActionMove, RootActionReveal, RootActionUpdateFunds, RootCard, RootCardName, RootFaction, RootFactionBoard, RootItem, RootItemState, RootPiece, RootPieceType, RootLocation, RootSuit, RootThing, RootVagabondRelationshipStatus, RootForest, RootActionPlot, RootActionType, RootVagabondItemSpecial } from './interfaces';
import { parseConspiracyAction, parseCultAction, parseDuchyAction, parseEyrieAction, parseMarquiseAction, parseRiverfolkAction, parseVagabondAction, parseWoodlandAction } from './parsers';
import { splitAction } from './utils/action-splitter';
import { extendCardName } from './utils/card-name-utils';
import { formRegex } from './utils/regex-former';

const ALL_FACTIONS = Object.values(RootFaction).join('');
const ALL_SUITS = Object.values(RootSuit).join('');
const ALL_ITEMS = Object.values(RootItem).join('');
const ALL_PIECES = Object.values(RootPieceType).join('');

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
const PRICE_OF_FAILURE_REGEX = formRegex('#<Minister|||lostMinister>[D]$->');

// export const MOVE_REGEX = formRegex('[Number|||countMoved]<Component|||componentMoved>[Location|||origin]->[Location|||destination]');

// Allows movement to/from faction-specific locations: Item locations + Quests, The Burrow, as well as generic locations
// Also allows movement of faction-specific components: Leaders, Characters, Ministers
const EXTENDED_MOVE_REGEX = formRegex('[Number|||countMoved]<ExtendedComponent|||componentMoved>[ExtendedLocation|||origin]->[ExtendedLocation|||destination]');

const FACTION_BOARD_REGEX = new RegExp(`^([${ALL_FACTIONS}])?\\$$`);
const ITEM_REGEX_STRING = `^\%[${ALL_ITEMS}]$`;
const ITEM_REGEX = new RegExp(ITEM_REGEX_STRING);
const PIECE_REGEX_STRING = `^[${ALL_FACTIONS}]?[${ALL_PIECES}]_?[swrkfrmcbe]?$`;
const PIECE_REGEX = new RegExp(PIECE_REGEX_STRING);
const CARD_REGEX_STRING = `^[${ALL_SUITS}]?#[@a-z]*$`;
const CARD_REGEX = new RegExp(CARD_REGEX_STRING);
const FOREST_REGEX = new RegExp('^(1[0-2]|[1-9])(_(1[0-2]|[1-9])){2,}$')

// parse a VP action, defaults to +1
export function parseVP(action: string, currentFaction: RootFaction): RootActionGainVP {
  const result = action.match(SCORE_VP_REGEX);

  return {
    faction: (result.groups.scoringFaction as RootFaction) || currentFaction,
    vp: +result.groups.points || 1
  };
}

// parse a VP reduction action, defaults to -1
export function parseLoseVP(action: string, currentFaction: RootFaction): RootActionGainVP {
  const result = action.match(REDUCE_VP_REGEX);

  return {
    faction: (result.groups.scoringFaction as RootFaction) || currentFaction,
    vp: -result.groups.points || -1
  };
}

// parse a dominance/coalition action
export function parseDominance(action: string, takingFaction: RootFaction): RootActionDominance {
  const result = action.match(REMOVE_FACTION_MARKER_REGEX);

  const targetFactionBoard = result.groups.targetFactionBoard;
  const targetFaction = (targetFactionBoard && targetFactionBoard.length > 1) ? targetFactionBoard[0] as RootFaction : takingFaction;
  return { target: targetFaction };
}

// parse a craft card or item
export function parseCraft(action: string): RootActionCraft {
  const result = action.match(CRAFT_REGEX);

  // craft an item
  if(result.groups.crafted[0] === '%') {
    return { craftItem: result.groups.crafted[1] as RootItem };
  }

  // craft a card
  return { craftCard: extendCardName(result.groups.crafted as RootCardName, null) as RootCardName };
}

// parse a combat action
export function parseCombat(action: string, takingFaction: RootFaction): RootActionCombat {
  const result = action.match(COMBAT_REGEX);
  const parsedAction: RootActionCombat = {
    attacker: (result.groups.attacker || takingFaction) as RootFaction,
    defender: result.groups.defender as RootFaction,
    clearing: +result.groups.battleClearing,
    ambush: (result.groups.defenderAmbush || null) as RootSuit,
    foilAmbush: (result.groups.attackerAmbush || null) as RootSuit
  }

  return parsedAction;
}

// TODO: Add default:
//    start: deck [card], current pawn location [pawn], supply [piece], or current faction board [item]
//    end: discard pile [card], supply/out of game [piece], or out of game [item]
export function parseLocation(location: string, takingFaction: RootFaction): RootLocation {
  if (location == null) {
    return null;
  } else if (FACTION_BOARD_REGEX.test(location)) {
    const [_, faction] = location.match(FACTION_BOARD_REGEX);
    return {
      faction: faction || takingFaction
    } as RootFactionBoard;
  } else if (Object.values(RootFaction).includes(location as RootFaction)) {
    // RETURN FACTION HAND
    return location as RootFaction;
  } else if (Object.values(RootItemState).includes(location as RootItemState)) {
    return location as RootItemState;
  } else if (Object.values(RootVagabondItemSpecial).includes(location as RootVagabondItemSpecial)) {
    return location as RootVagabondItemSpecial;
  } else if (location === "Q") {
    return "Quests";
  } else if (location === "*") {
    return "Discard pile";
  } else if (FOREST_REGEX.test(location)) {
    return { clearings: location.split("_").map(Number) } as RootForest
  } else if (+location !== NaN) {
    return +location;
  }

  throw new Error(`Could not parse location: "${location}"`);
}

// parse a move action
export function parseMove(action: string, takingFaction: RootFaction): RootActionMove {

  const actions = splitAction(action);
  const movingComponents = [];

  for (let simpleAction of actions) {
    const result = simpleAction.match(EXTENDED_MOVE_REGEX);
    if (!result) {
      throw new Error(`Couldn't parse action: ${simpleAction}`);
    }
    const number = result.groups.componentMoved === '%_' ? -1 : +(result.groups.countMoved || 1);
    const origin = parseLocation(result.groups.origin, takingFaction);

    const component = (function parseThing(thingString: string): RootPiece | RootCard | RootItem {
      if (ITEM_REGEX.test(thingString)) {
        return thingString[1] as RootItem;
      } else if (PIECE_REGEX.test(thingString)) {
        const [_, faction, piece] = thingString.match(new RegExp(`([${ALL_FACTIONS}])?(.+)`));
        return {
          faction: faction as RootFaction || takingFaction,
          piece: piece,
          pieceType: piece[0] as RootPieceType
        }
      } else if (CARD_REGEX.test(thingString)) {
        return parseCard(thingString);
      }
      return null;
    }(result.groups.componentMoved));

    const componentPiece = component as RootPiece;
    if (componentPiece !== null &&
        (componentPiece.faction === RootFaction.Vagabond || componentPiece.faction === RootFaction.Vagabond2) &&
        componentPiece.pieceType !== RootPieceType.Pawn && componentPiece.pieceType !== RootPieceType.Raft) {
      throw new Error(`Vagabond doesn't have a ${componentPiece.pieceType} piece type, only a ${RootPieceType.Pawn}. On their turn: ${simpleAction}`);
    }

    movingComponents.push({
      number: number,
      thing: component,
      start: origin,
      destination: parseLocation(result.groups.destination, takingFaction)
    } as RootThing);
  }

  return {
    things: movingComponents
  };
}

export function parseCard(card: string): RootCard {
    if (!card.includes('#')) {
        return null;
    }

    const cardParts = card.split('#');

    return {
        suit: (cardParts[0] || null) as RootSuit,
        cardName: extendCardName(cardParts[1] as RootCardName, cardParts[0] as RootSuit) || null
    };
}

// parse a reveal action
export function parseReveal(action: string, takingFaction: RootFaction): RootActionReveal {

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
      revealer: (result.groups.revealingFaction || takingFaction) as RootFaction
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
export function parseClearMountainPath(action: string): RootActionClearPath {

  const result = action.match(CLEAR_MOUNTAIN_PATH_REGEX);

  return {
    clearings: [+result.groups.lowerClearing, +result.groups.upperClearing]
  };

}

export function parseUpdateRelationshipAction(action: string, takingFaction: RootFaction): RootActionMove {

  if (UPDATE_RELATIONSHIP_REGEX.test(action)) {
    const result = action.match(UPDATE_RELATIONSHIP_REGEX);
    const vagabondFaction = result.groups.vagabondFaction || takingFaction;
    const relationshipFaction = result.groups.relationshipFaction;
    const relationshipLevel = result.groups.updatedRelationship;

    return {
      things: [{
        number: 1,
        thing: {faction: relationshipFaction, piece: relationshipFaction},  // TODO: Probably adjust this?
        start: {faction: vagabondFaction} as RootFactionBoard,
        destination: relationshipLevel as RootVagabondRelationshipStatus
      } as RootThing]
    };
  }

}

export function parseUpdateFundsAction(action: string): RootActionUpdateFunds {

  if (UPDATE_FUNDS_REGEX.test(action)) {
    const result = action.match(UPDATE_FUNDS_REGEX);

    return {
      funds: +result.groups.fundsRemaining
    };
  }

}

export function parsePriceOfFailureAction(action: string): RootActionMove {

  if (PRICE_OF_FAILURE_REGEX.test(action)) {
    const result = action.match(PRICE_OF_FAILURE_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.lostMinister } as RootCard,
        start: {faction: RootFaction.Duchy} as RootFactionBoard,
        destination: null
      } as RootThing]
    };
  }

  return null;

}

export function parsePlotAction(action: string): RootActionPlot {

  if (EXPOSE_PLOT_REGEX.test(action)) {
    const result = action.match(EXPOSE_PLOT_REGEX);

    return {
      type: RootActionType.ExposePlot,
      plot: result.groups.plotGuessed,
      clearing: +result.groups.plotClearing
    };
  }

  if (FLIP_RAID_PLOT_REGEX.test(action)) {
    const result = action.match(FLIP_RAID_PLOT_REGEX);

    return {
      type: RootActionType.FlipPlot,
      plot: 't_r',
      clearing: +result.groups.plotClearing
    };
  }

  return null;

}

// parse out an action
export function parseAction(action: string, faction: RootFaction): any {

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

  if(action.includes('^')) {
    return parseReveal(action, faction);
  }

  if(action.includes('->')) {
    return parseMove(action, faction);
  }

  throw new Error(`Could not parse action: "${action}" (${faction}) - no handlers for this.`);
}