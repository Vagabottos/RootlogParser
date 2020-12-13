import { RootGame, Suit } from '../interfaces';
import { parseClearings, parseDeck, parseMap, parsePlayer, parsePool, parseTurn, parseWinner } from './metadata';

export function parseRootlog(rootlog: string): RootGame {
  const game: Partial<RootGame> = {
    turns: [],
    players: {},

    // default clearings are the default fall map layout
    clearings: ['F', 'M', 'B', 'B', 'B', 'F', 'M', 'F', 'M', 'B', 'M', 'F'] as Suit[]
  };

  rootlog.split('\n').forEach((line) => {

    // strip out comments, and always take the left side of comments
    line = line.split('//')[0].trim();

    if(!line) return;

    // parse out the pool
    if(line.startsWith('Pool:')) {
      game.pool = parsePool(line);
      return;
    }

    // parse out the winner
    if(line.startsWith('Winner:')) {
      game.winner = parseWinner(line);
      return;
    }

    // parse out the winner
    if(line.startsWith('Clearings:')) {
      game.clearings = parseClearings(line);
      return;
    }

    // parse out the deck
    if(line.startsWith('Deck:')) {
      game.deck = parseDeck(line);
      return;
    }

    // parse out the map
    if(line.startsWith('Map:')) {
      game.map = parseMap(line);
      return;
    }

    // if the second character is a :, this is a turn
    if(line[1] === ':') {

      // if we haven't seen this faction before, it's the player name
      const faction = line.split(':')[0];
      if(!game.players[faction]) {
        game.players[faction] = parsePlayer(line);
        return; 
      }

      game.turns.push(parseTurn(line));
      return;
    }

    console.error(`Could not parse line: "${line}" - no handlers for this.`);
    // throw new Error(`Could not parse line: "${line}" - no handlers for this.`);

  });

  return game as RootGame;
};