import { Card, CardName, Faction, Item, Piece, RootLocation, Suit } from './rootgame';

export type Action = ActionGainVP | ActionCraft | ActionMove | ActionDominance | ActionCombat | ActionReveal;

export interface ActionGainVP {
  faction: Faction;
  vp: number;
}

export interface ActionCraft {
  craftItem?: Item;
  craftCard?: CardName;
}

export interface ActionCombat {
  attacker: Faction;
  defender: Faction;
  clearing: number;
  ambush?: Suit;
  foilAmbush?: Suit;
}

export interface Thing {
  number: number;
  thing: Card | Item | Piece;
  start: RootLocation;
}

export interface ActionMove {
  things: Thing[];
  destinations: RootLocation[];
}

export interface ActionDominance {
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