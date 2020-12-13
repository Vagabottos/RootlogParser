import { parseAction } from '../action-parser';
import { RootDeck, RootFaction, RootMap, RootSuit, RootTurn } from '../interfaces';


function cleanText(str: string = ''): string {
  return str.trim();
}

// map line format: Map: <text>
export function parseMap(line: string): RootMap {
  return cleanText(line.split('Map:')[1]) as RootMap;
}

// deck line format: Deck: <text>
export function parseDeck(line: string): RootDeck {
  return cleanText(line.split('Deck:')[1]) as RootDeck;
}

// winner line format: Winner: <factions...>
export function parseWinner(line: string): RootFaction[] {
  return cleanText(line.split('Winner:')[1]).split('') as RootFaction[];
}

// pool line format: Pool: <factions...>
export function parsePool(line: string): RootFaction[] {
  return cleanText(line.split('Pool:')[1]).split('') as RootFaction[];
}

// player line format: <Faction>: Player Name
export function parsePlayer(line: string): string {
  return cleanText(line.split(':')[1]);
}

// clearing line format: Clearings: <suit>X, <suit>Y (x/y = clearing num, 1-indexed)
export function parseClearings(line: string): RootSuit[] {
  const suitPos = [];

  line.split('Clearings:')[1].split(',').map(x => x.trim()).forEach((suitWithPos, idx) => {
    const suit = suitWithPos.substring(0, 1);
    let pos = +suitWithPos.substring(1);

    if(isNaN(pos)) pos = idx + 1;

    suitPos[pos - 1] = suit as RootSuit;
  })

  return suitPos;
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