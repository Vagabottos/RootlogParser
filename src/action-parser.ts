import { Action, ActionCombat, ActionCraft, ActionDominance, ActionGainVP, ActionMove, ActionReveal, Card, CardName, CorvidSpecial, Faction, Item, ItemState, Piece, SubjectReveal, Suit } from './interfaces';
import { parseConspiracyAction, parseCultAction, parseDuchyAction, parseEyrieAction, parseMarquiseAction, parseRiverfolkAction, parseVagabondAction, parseWoodlandAction } from './parsers';
import { formRegex } from './utils/regex-former';

const ALL_FACTIONS = Object.values(Faction).join('');
const ALL_SUITS = Object.values(Suit).join('');
const ALL_ITEMS = Object.values(Item).join('');
const ALL_PIECES = Object.values(Piece).join('');
const ALL_ITEM_STATE = Object.values(ItemState).join('');

// These regexes have been tested, but not extensively. They do not yet contain the information unique to each faction, other than
// pieces of the format w_x, b_x, t_x
// With the move regex especially, be careful of the order you check for actions in: As things are now, it treats `despot->$` as
// the unrelated letters 'despo' followed by `t->$`

// These also do not work on composite actions! Please first decompose actions like (t1+t2)->5 into simple actions with the actionSplitter

// const COMBAT_REGEX = formRegex('[Faction|||attacker]X<Faction|||defender><Clearing|||battleClearing>[<Suit|||defenderAmbush>@[<Suit|||attackerAmbush>@]][(<Roll|||attackerRoll>,<Roll|||defenderRoll>)]');
const MOVE_REGEX = formRegex('[Number|||countMoved]<Component|||componentMoved>[Location|||origin]->[Location|||destination]');
const MOVE_PIECE_REGEX = formRegex('[Number|||countMoved]<Piece|||pieceMoved>[Location|||origin]->[Location|||destination]');
const MOVE_CARD_REGEX = formRegex('[Number|||countMoved]<Card|||cardMoved>[Location|||origin]->[Location|||destination]');
// const MOVE_ITEM_REGEX = formRegex('[Number|||countMoved]<Item|||itemMoved>[Location|||origin]->[Location|||destination]');
const REVEAL_REGEX = formRegex('[Number|||countRevealed][Card|||cardRevealed][Faction|||revealingFaction]^[Faction|||revealedFaction]');
const SCORE_VP_REGEX = formRegex('[Faction|||scoringFaction]++[Number|||points]');
const REDUCE_VP_REGEX = formRegex('[Faction|||scoringFaction]--[Number|||points]');
const CRAFT_REGEX = formRegex('Z<Craftable|||crafted>');
const REMOVE_FACTION_MARKER_REGEX = formRegex('++-><FactionBoard|||targetFaction>');
const CLEAR_MOUNTAIN_PATH_REGEX = formRegex('<Clearing|||lowerClearing>_<Clearing|||upperClearing>->');

const GROUPING_REGEX = new RegExp(`\\((.+)\\)(.+)`);
const COMBAT_REGEX = new RegExp(`^([${ALL_FACTIONS}])?X([${ALL_FACTIONS}])([0-9]{1,2})`);

const MOVE_ITEM_REGEX = new RegExp(`^%([${ALL_ITEMS}]{1,2})?([${ALL_FACTIONS}])?\\$?([${ALL_ITEM_STATE}])?->([${ALL_ITEM_STATE}])?([${ALL_FACTIONS}])?\\$?`);

// parse a VP action, defaults to +1
// TODO: include faction
function parseVP(action: string): ActionGainVP {
  const count = action.split('++')[1] || '1';
  return { vp: +count };
}

// parse a dominance action
// TODO: parse dom
function parseDominance(action: string): ActionDominance {
  return { target: Faction.Marquise };
}

// parse a craft card or item
function parseCraft(action: string): ActionCraft {
  const craft = action.split('Z')[1];

  // craft an item
  if(craft[0] === '%') {
    return { craftItem: craft[1] as Item };
  }

  // craft a card
  return { craftCard: craft[0] as Card };
}

// parse a combat action
function parseCombat(action: string, takingFaction: Faction): ActionCombat {
  const [_, taker, target, clearing] = action.match(COMBAT_REGEX);
  return {
    attacker: (taker || takingFaction) as Faction,
    defender: target as Faction,
    clearing: +clearing
  };
}

// parse a move action
function parseMove(action: string, takingFaction: Faction): ActionMove {
  
  const move = {
    things: null,
    start: null,
    end: null
  };

  return move;

}

function parseMoveItem(action: string, takingFaction: Faction): ActionMove {

  console.log(action.match(MOVE_ITEM_REGEX));

  return null;
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
  
  const [leftSide, rightSide] = action.split('^', 2);

  const targets = rightSide.includes('+')
    ? rightSide.split('+').map(s => s || null)
    : [rightSide || null];

  function parseLeftSideOfReveal(leftSide: string): any {
    const twoDigitNumberRegex = /^([0-9]{1,2}).*/;
    const number = twoDigitNumberRegex.test(leftSide)
      ? leftSide.match(twoDigitNumberRegex)[1]
      : null;
    
    const revealer = ALL_FACTIONS.split('').some(faction => leftSide.endsWith(faction))
      ? leftSide[leftSide.length - 1] as Faction
      : null;

    const card = leftSide.substring(
      number ? number.toString().length : 0,
      leftSide.length - (revealer ? revealer.length : 0)
    );

    return {
      number: card ? (+number || 1) : null,
      card: card ? parseCard(card) : null,
      revealer: revealer || takingFaction
    };
  }

  const subjects = (function () {
    if (GROUPING_REGEX.test(leftSide)) {
      const [_, grouped, outerTerm] = leftSide.match(GROUPING_REGEX);
      return grouped.split('+').map(g => parseLeftSideOfReveal(g + outerTerm));
    } else if (leftSide.includes('+')) {
      return leftSide.split('+').map(g => parseLeftSideOfReveal(g));
    } else {
      return [parseLeftSideOfReveal(leftSide)];
    }
  }());

  return {
    subjects: subjects as SubjectReveal[],
    targets: targets as Faction[]
  };
}

// parse out an action 
export function parseAction(action: string, faction: Faction): Action {

  if(action.includes('++') && !action.includes('->')) {
    return parseVP(action);
  }

  if(action.includes('++') && action.includes('->')) {
    return parseDominance(action);
  }

  if(action.startsWith('Z')) {
    return parseCraft(action);
  }

  if(action.includes('->')) {
    return parseMove(action, faction);
  }

  if(COMBAT_REGEX.test(action)) {
    return parseCombat(action, faction);
  }

  if(action.includes('^') && !Object.values(CorvidSpecial).some(corvidPlot => action.endsWith(corvidPlot))) {
    return parseReveal(action, faction);
  }

  if(MOVE_ITEM_REGEX.test(action)) {
    return parseMoveItem(action, faction);
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