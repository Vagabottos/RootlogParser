import { parseAction } from '../action-parser';
import { Deck, Faction, Map, Suit, Turn } from '../interfaces';


function cleanText(str: string = ''): string {
  return str.trim();
}

// map line format: Map: <text>
export function parseMap(line: string): Map {
  return cleanText(line.split('Map:')[1]) as Map;
}

// deck line format: Deck: <text>
export function parseDeck(line: string): Deck {
  return cleanText(line.split('Deck:')[1]) as Deck;
}

// winner line format: Winner: <factions...>
export function parseWinner(line: string): Faction[] {
  return cleanText(line.split('Winner:')[1]).split('') as Faction[];
}

// pool line format: Pool: <factions...>
export function parsePool(line: string): Faction[] {
  return cleanText(line.split('Pool:')[1]).split('') as Faction[];
}

// player line format: <Faction>: Player Name
export function parsePlayer(line: string): string {
  return cleanText(line.split(':')[1]);
}

// clearing line format: Clearings: <suit>X, <suit>Y (x/y = clearing num, 1-indexed)
export function parseClearings(line: string): Suit[] {
  const suitPos = [];

  line.split('Clearings:')[1].split(',').map(x => x.trim()).forEach((suitWithPos, idx) => {
    const suit = suitWithPos.substring(0, 1);
    let pos = +suitWithPos.substring(1);

    if(isNaN(pos)) pos = idx + 1;

    suitPos[pos - 1] = suit as Suit;
  })

  return suitPos;
}

// parse out a turn, anything with a single character followed by the colon
export function parseTurn(line: string): Turn {
  const turn: Partial<Turn> = {
    actions: []
  };

  const [taker, unparsedActions] = line.split(':');
  turn.taker = taker as Faction;

  unparsedActions.split(/[\/;]/).forEach(action => {
    turn.actions.push(parseAction(action, turn.taker));
  });

  return turn as Turn;
}