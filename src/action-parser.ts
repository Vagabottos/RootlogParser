import { Action, ActionCombat, ActionCraft, ActionDominance, ActionGainVP, ActionMove, ActionReveal, Card, CardName, CorvidSpecial, Faction, Item, ItemState, Piece, SubjectReveal, Suit } from './interfaces';
import { parseConspiracyAction, parseCultAction, parseDuchyAction, parseEyrieAction, parseMarquiseAction, parseRiverfolkAction, parseVagabondAction, parseWoodlandAction } from './parsers';

const ALL_FACTIONS = Object.values(Faction).join('');
const ALL_SUITS = Object.values(Suit).join('');
const ALL_ITEMS = Object.values(Item).join('');
const ALL_PIECES = Object.values(Piece).join('');
const ALL_ITEM_STATE = Object.values(ItemState).join('');

const GROUPING_REGEX = new RegExp(`\\((.+)\\)(.+)`);
const COMBAT_REGEX = new RegExp(`^([${ALL_FACTIONS}])?X([${ALL_FACTIONS}])([0-9]{1,2})([${ALL_SUITS}]\@)?([${ALL_SUITS}]\@)?`);

// parse a VP action, defaults to +1
export function parseVP(action: string, takingFaction: Faction): ActionGainVP {
  const vpActionPieces = action.split('++');
  const count = vpActionPieces[1] || '1';
  return {
    vp: +count,
    faction: (vpActionPieces[0] || takingFaction) as Faction
  };
}

// parse a dominance/coalition action
// TODO: parse target
function parseDominance(action: string): ActionDominance {
  return {
    target: Faction.Marquise
  };
}

// parse a craft card or item
export function parseCraft(action: string): ActionCraft {
  const craft = action.split('Z')[1];

  // craft an item
  if(craft[0] === '%') {
    return { craftItem: craft[1] as Item };
  }

  // craft a card
  return { craftCard: craft as CardName };
}

// parse a combat action
export function parseCombat(action: string, takingFaction: Faction): ActionCombat {
  const [_, taker, target, clearing, ambush, foilAmbush] = action.match(COMBAT_REGEX);
  return {
    attacker: (taker || takingFaction) as Faction,
    defender: target as Faction,
    clearing: +clearing,
    ambush: ambush ? ambush[0] as Suit : null,
    foilAmbush: foilAmbush ? foilAmbush[0] as Suit : null
  };
}

// parse a move action
function parseMove(action: string, takingFaction: Faction): ActionMove {
  
  const [leftSide, rightSide] = action.split('^', 2);

  const destinations = parseCombineAndGroup(rightSide)
    .map(function (rightSide: string): any {

    });

  const things = parseCombineAndGroup(leftSide)
    .map(function (leftSide: string): any {
    });

  const move = {
    things: things,
    destinations: destinations
  };

  return move;

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

function parseCombineAndGroup(side: string): string[] {
  if (GROUPING_REGEX.test(side)) {
    const [_, grouped, outerTerm] = side.match(GROUPING_REGEX);
    return grouped.split('+').map(g => g + outerTerm);
  } else if (side.includes('+')) {
    return side.split('+');
  } else {
    return [side || null];
  }
}

// parse a reveal action
export function parseReveal(action: string, takingFaction: Faction): ActionReveal {
  
  const [leftSide, rightSide] = action.split('^', 2);

  const targets = parseCombineAndGroup(rightSide);

  const subjects = parseCombineAndGroup(leftSide)
    .map(function (leftSide: string): any {
      const twoDigitNumberRegex = /^([0-9]{1,2}).*/;
      const number = twoDigitNumberRegex.test(leftSide)
        ? leftSide.match(twoDigitNumberRegex)[1]
        : null;
      
      const revealer = ALL_FACTIONS.split('').some(faction => leftSide && leftSide.endsWith(faction))
        ? leftSide[leftSide.length - 1] as Faction
        : null;
  
      const card = leftSide
        ? leftSide.substring(
          number ? number.toString().length : 0,
          leftSide.length - (revealer ? revealer.length : 0)
        )
        : leftSide;
  
      return {
        number: card ? (+number || 1) : null,
        card: card ? parseCard(card) : null,
        revealer: revealer || takingFaction
      };
    });

  return {
    subjects: subjects as SubjectReveal[],
    targets: targets as Faction[]
  };
}

// parse out an action 
export function parseAction(action: string, faction: Faction): Action {

  if(action.includes('++') && !action.includes('->')) {
    return parseVP(action, faction);
  }

  if(action.includes('++') && action.includes('->')) {
    return parseDominance(action);
  }

  if(action.startsWith('Z')) {
    return parseCraft(action);
  }

  if(action.includes('->')) {
    if (action.includes('<->')) {
      // TODO: Parse Corvid Trick action.
    } else {
      return parseMove(action, faction);
    }
  }

  if(COMBAT_REGEX.test(action)) {
    return parseCombat(action, faction);
  }

  if(action.includes('^')) {
    if (!Object.values(CorvidSpecial).some(corvidPlot => action.endsWith(corvidPlot))) {
      return parseReveal(action, faction);
    } else {
      // TODO: Parse Corvid reveal plot
    }
  }

  switch(faction) {
    case 'C': return parseMarquiseAction(action);
    case 'E': return parseEyrieAction(action);
    case 'A': return parseWoodlandAction(action);
    case 'V': return parseVagabondAction(action);
    case 'G': return parseVagabondAction(action);
    case 'L': return parseCultAction(action);
    case 'O': return parseRiverfolkAction(action);
    case 'D': return parseDuchyAction(action);
    case 'P': return parseConspiracyAction(action);
    default: {
      console.error(`Could not parse action: "${action}" (${faction}) - no handlers for this.`);
      // throw new Error(`Could not parse action: "${action}" - no handlers for this.`);
    }
  }

}