import { Card, Faction, Item, Piece, Suit } from './rootgame';

export type Action = ActionGainVP | ActionCraft | ActionMove | ActionDominance | ActionCombat | ActionReveal;

export interface ActionGainVP {
  vp: number;
}

export interface ActionCraft {
  craftItem?: Item;
  craftCard?: Card;
}

export interface ActionCombat {
  attacker: Faction;
  defender: Faction;
  clearing: number;
  ambush?: Suit;
  foilAmbush?: Suit;
}

export interface ActionMove {
  num: number;
  thing: Card | Item | Piece;
  start: number | string;
  end: number | string;
}

export interface ActionDominance {
  target: Faction;
}

export interface ActionReveal {
  num: number;
  suit: Suit;
  revealer: Faction;
  target?: Faction;
}