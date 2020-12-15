import { RootActionGainVP, RootGame, RootSuit } from '../interfaces';
import { parseClearings, parseDeck, parseMap, parsePlayer, parsePool, parseTurn, parseWinner } from './metadata';

export function parseRootlog(rootlog: string): RootGame {
  const game: Partial<RootGame> = {
    turns: [],
    players: {},

    // default clearings are the default fall map layout
    clearings: [
      RootSuit.Fox, RootSuit.Mouse, RootSuit.Rabbit,
      RootSuit.Rabbit, RootSuit.Rabbit, RootSuit.Fox,
      RootSuit.Mouse, RootSuit.Fox, RootSuit.Mouse,
      RootSuit.Rabbit, RootSuit.Mouse, RootSuit.Fox
    ] as RootSuit[],

    stats: {}
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

    throw new Error(`Could not parse line: "${line}" - no handlers for this.`);
  });

  // Calculate biggest point turn in game.
  const pointsPerTurn = game.turns.map(turn => {
    const pointsScored = turn.actions.map(a => {
      return (a as RootActionGainVP).vp || 0;
    }).reduce((a, b) => {
      return a + b;
    }, 0);

    return {
      faction: turn.taker,
      pointsScored: pointsScored,
      turn: game.turns.indexOf(turn) + 1
    };
  }).sort(turn => -turn.pointsScored);

  if (pointsPerTurn.length > 0) {
    game.stats.highestScoringTurn = pointsPerTurn[0];
  }

  return game as RootGame;
};