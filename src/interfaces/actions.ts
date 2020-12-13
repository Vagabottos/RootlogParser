import { RootCard, RootCardName, RootFaction, RootItem, RootPiece, RootLocation, RootSuit } from './rootgame';

export type Action = ActionGainVP | ActionCraft | ActionMove | ActionDominance | ActionCombat | ActionReveal | ActionClearPath | ActionSetOutcast | ActionSetPrices | ActionUpdateFunds | ActionTriggerPlot | ActionSwapPlots;

export interface ActionGainVP {
  vp: number;
  faction: RootFaction;
}

export interface ActionCraft {
  craftItem?: RootItem;
  craftCard?: RootCardName;
}

export interface ActionCombat {
  attacker: RootFaction;
  defender: RootFaction;
  clearing: number;
  ambush?: RootSuit;
  foilAmbush?: RootSuit;
}

export interface Thing {
  number: number;
  thing: RootCard | RootItem | RootPiece;
  start: RootLocation;
}

export interface ActionMove {
  things: Thing[];
  destinations: RootLocation[];
}

export interface ActionDominance {
  target: RootFaction;
}

export interface SubjectReveal {
    number?: number,
    card?: RootCard,
    revealer: RootFaction
}

export interface ActionReveal {
  subjects: SubjectReveal[];
  targets: RootFaction[];
}

export interface ActionClearPath {
  clearings: number[];
}

export interface ActionSetOutcast {
  degree: string;  // TODO: Come up with a better name for this to distinguish between Outcast and Hated Outcast
  suit: RootSuit;
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