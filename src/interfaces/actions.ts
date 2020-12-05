import { Card, Faction, Item, Piece, Suit } from './rootgame';

export type Action = ActionGainVP | ActionCraft | ActionMove | ActionDominance | ActionCombat | ActionReveal;

export interface ActionGainVP {
  faction: Faction;
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
  things: Card[] | Item[] | Piece[];
  start: number | string;
  end: number | string;
}

export interface ActionDominance {
  faction: Faction;
  target: Faction;
}

export interface SubjectReveal {
    number?: number,
    card?: Card,
    revealer: Faction
}

export interface ActionReveal {
  subjects: SubjectReveal[];
  targets: Faction[];
}