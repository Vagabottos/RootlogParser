import { Card, Faction, Item, Piece, Suit } from './rootgame';

export type Action = ActionGainVP | ActionCraft | ActionMove | ActionDominance | ActionCombat | ActionReveal | ActionClearPath | ActionSetOutcast | ActionSetPrices | ActionUpdateFunds | ActionTriggerPlot | ActionSwapPlots;

export interface ActionGainVP {
  vp: number;
  faction: Faction;
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

export interface ActionClearPath {
  clearings: number[];
}

export interface ActionSetOutcast {
  degree: string;  // TODO: Come up with a better name for this to distinguish between Outcast and Hated Outcast
  suit: Suit;
}

export interface ActionSetPrices {
  priceTypes: string[];
  price: number;
}

export interface ActionUpdateFunds {
  funds: number;
}

export interface ActionTriggerPlot {
  plot: string;
  clearing: number;
}

export interface ActionSwapPlots {
  clearings: number[];
}