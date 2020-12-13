
import { RootFaction } from './rootgame';

/*
TODO: 
- track gamestate after each action? 
- cut out VP actions and assign the VP to the previous action?
*/

export interface GameState {
  vp: Record<RootFaction, number>;
}