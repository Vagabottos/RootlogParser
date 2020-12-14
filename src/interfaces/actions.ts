import { RootCard, RootCardName, RootFaction, RootItem, RootPiece, RootLocation, RootSuit } from './rootgame';

export type RootAction = RootActionGainVP | RootActionCraft | RootActionMove | RootActionDominance | RootActionCombat | RootActionReveal | RootActionClearPath | RootActionSetOutcast | RootActionSetPrices | RootActionUpdateFunds | RootActionTriggerPlot | RootActionSwapPlots;

export interface RootActionGainVP {
  vp: number;
  faction: RootFaction;
}

export interface RootActionCraft {
  craftItem?: RootItem;
  craftCard?: RootCardName;
}

export interface RootActionCombat {
  attacker: RootFaction;
  defender: RootFaction;
  clearing: number;
  ambush?: RootSuit;
  foilAmbush?: RootSuit;
}

export interface RootThing {
  number: number;
  thing: RootCard | RootItem | RootPiece;
  start: RootLocation;
  destination: RootLocation;
}

export interface RootActionMove {
  things: RootThing[];
}

export interface RootActionDominance {
  target: RootFaction;
}

export interface RootSubjectReveal {
    number?: number,
    card?: RootCard,
    revealer: RootFaction
}

export interface RootActionReveal {
  subjects: RootSubjectReveal[];
  targets: RootFaction[];
}

export interface RootActionClearPath {
  clearings: number[];
}

export interface RootActionSetOutcast {
  degree: string;  // TODO: Come up with a better name for this to distinguish between Outcast and Hated Outcast
  suit: RootSuit;
}

export interface RootActionSetPrices {
  priceTypes: string[];
  price: number;
}

export interface RootActionUpdateFunds {
  funds: number;
}

export interface RootActionTriggerPlot {
  plot: string;
  clearing: number;
}

export interface RootActionSwapPlots {
  clearings: number[];
}