import { Action, ActionCombat, ActionCraft, ActionDominance, ActionGainVP, ActionMove, ActionReveal, Card, Faction, Item, ItemState, Piece, Suit } from './interfaces';
import { parseConspiracyAction, parseCultAction, parseDuchyAction, parseEyrieAction, parseMarquiseAction, parseRiverfolkAction, parseVagabondAction, parseWoodlandAction } from './parsers';

const ALL_FACTIONS = Object.values(Faction).join('') + '#';
const ALL_SUITS = Object.values(Suit).join('');
const ALL_ITEMS = Object.values(Item).join('');
const ALL_PIECES = Object.values(Piece).join('');
const ALL_ITEM_STATE = Object.values(ItemState).join('');

const COMBAT_REGEX = new RegExp(`^([${ALL_FACTIONS}])?X([${ALL_FACTIONS}])([0-9]{1,2})`);
const REVEAL_REGEX = new RegExp(`^([0-9]{1,2})?([${ALL_SUITS}])?([${ALL_FACTIONS}])?\\^([${ALL_FACTIONS}])?`);
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
    num: 0,
    thing: null,
    start: null,
    end: null
  };

  return move;

}

function parseMoveItem(action: string, takingFaction: Faction): ActionMove {

  console.log(action.match(MOVE_ITEM_REGEX));

  return null;
}

// parse a reveal action
function parseReveal(action: string, takingFaction: Faction): ActionReveal {
  
  const [_, num, suit, taker, target] = action.match(REVEAL_REGEX);

  const revealer = (!taker || taker === '#') ? takingFaction : taker as Faction;

  return {
    num: num ? +num : 1,
    suit: suit as Suit,
    revealer,
    target: target as Faction
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

  if(REVEAL_REGEX.test(action)) {
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