import { parseAction } from '../action-parser';
import { RootDeck, RootFaction, RootMap, RootSuit, RootTurn } from '../interfaces';


function cleanText(str: string = ''): string {
  return str.trim();
}

// map line format: Map: <text>
export function parseMap(line: string): RootMap {
  const map = cleanText(line.split('Map:')[1]) as RootMap;

  if (!Object.values(RootMap).includes(map)) {
    throw new Error(`Map ${map} doesn't exist.`);
  }

  return map;
}

// deck line format: Deck: <text>
export function parseDeck(line: string): RootDeck {
  const deck = cleanText(line.split('Deck:')[1]) as RootDeck;

  if (!Object.values(RootDeck).includes(deck)) {
    throw new Error(`Deck ${deck} doesn't exist.`);
  }

  return deck;
}

// winner line format: Winner: <factions...>
export function parseWinner(line: string): RootFaction[] {
  const winners = cleanText(line.split('Winner:')[1]).split('') as RootFaction[];

  for (let winner of winners) {
    if (!Object.values(RootFaction).includes(winner)) {
      throw new Error(`Winner contains invalid Faction ${winner}.`);
    }
  }

  return winners;
}

// pool line format: Pool: <factions...>
export function parsePool(line: string): RootFaction[] {
  const pool = cleanText(line.split('Pool:')[1]).split('') as RootFaction[];

  for (let faction of pool) {
    if (!Object.values(RootFaction).includes(faction)) {
      throw new Error(`Faction pool contains invalid Faction ${faction}.`);
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
export function parseClearings(line: string): RootSuit[] {
  const suitClearing = [];

  line.split('Clearings:')[1].split(',').map(x => x.trim()).forEach((suitWithClearing, index) => {
    const suit = suitWithClearing.substring(0, 1) as RootSuit;
    let clearingNumber = +suitWithClearing.substring(1);
    
    if(isNaN(clearingNumber)) {
      clearingNumber = index + 1;
    }

    if (suit === RootSuit.Bird) {
      throw new Error(`"Bird" is not a valid clearing suit for clearing ${clearingNumber}.`);
    } else if (suit !== RootSuit.Fox && suit !== RootSuit.Mouse && suit !== RootSuit.Rabbit) {
      throw new Error(`Clearing ${clearingNumber} has an invalid suit: ${suit}.`);
    }
    
    suitClearing[clearingNumber - 1] = suit as RootSuit;
  })

  return suitClearing;
}

// parse out a turn, anything with a single character followed by the colon
export function parseTurn(line: string): RootTurn {
  const turn: Partial<RootTurn> = {
    actions: []
  };

  const [taker, unparsedActions] = line.split(':');
  turn.taker = taker as RootFaction;

  unparsedActions.split(/[\/;]/).forEach(action => {
    const actionObj = parseAction(action, turn.taker) || {raw: action};
    actionObj.raw = action;
    turn.actions.push(actionObj);
  });

  return turn as RootTurn;
}