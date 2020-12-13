import { parseAction } from '../action-parser';
import { Deck, Faction, Map, Suit, Turn } from '../interfaces';


function cleanText(str: string = ''): string {
  return str.trim();
}

// map line format: Map: <text>
export function parseMap(line: string): Map {
  const map = cleanText(line.split('Map:')[1]) as Map;

  if (!Object.values(Map).includes(map)) {
    throw `Map ${map} doesn't exist.`;
  }

  return map;
}

// deck line format: Deck: <text>
export function parseDeck(line: string): Deck {
  const deck = cleanText(line.split('Deck:')[1]) as Deck;

  if (!Object.values(Deck).includes(deck)) {
    throw `Deck ${deck} doesn't exist.`;
  }

  return deck;
}

// winner line format: Winner: <factions...>
export function parseWinner(line: string): Faction[] {
  const winners = cleanText(line.split('Winner:')[1]).split('') as Faction[];

  for (let winner of winners) {
    if (!Object.values(Faction).includes(winner)) {
      throw `Winner contains invalid Faction ${winner}.`;
    }
  }

  return winners;
}

// pool line format: Pool: <factions...>
export function parsePool(line: string): Faction[] {
  const pool = cleanText(line.split('Pool:')[1]).split('') as Faction[];

  for (let faction of pool) {
    if (!Object.values(Faction).includes(faction)) {
      throw `Faction pool contains invalid Faction ${faction}.`;
    }
  }

  return pool;
}

// player line format: <Faction>: Player Name
export function parsePlayer(line: string): string {
  const player = cleanText(line.split(':')[1]);
  return player;
}

// clearing line format: Clearings: <suit>X, <suit>Y (x/y = clearing num, 1-indexed)
export function parseClearings(line: string): Suit[] {
  const suitClearing = [];

  line.split('Clearings:')[1].split(',').map(x => x.trim()).forEach((suitWithClearing, index) => {
    const suit = suitWithClearing.substring(0, 1) as Suit;
    let clearingNumber = +suitWithClearing.substring(1);
    
    if(isNaN(clearingNumber)) {
      clearingNumber = index + 1;
    }

    if (suit === Suit.Bird) {
      throw `"Bird" is not a valid clearing suit for clearing ${clearingNumber}.`
    } else if (suit !== Suit.Fox && suit !== Suit.Mouse && suit !== Suit.Rabbit) {
      throw `Clearing ${clearingNumber} has an invalid suit: ${suit}.`;
    }
    
    suitClearing[clearingNumber - 1] = suit as Suit;
  })

  return suitClearing;
}

// parse out a turn, anything with a single character followed by the colon
export function parseTurn(line: string): Turn {
  const turn: Partial<Turn> = {
    actions: []
  };

  const [taker, unparsedActions] = line.split(':');
  turn.taker = taker as Faction;

  unparsedActions.split(/[\/;]/).forEach(action => {
    const actionObj = parseAction(action, turn.taker) || {raw: action};
    actionObj.raw = action;
    turn.actions.push(actionObj);
  });

  return turn as Turn;
}