import { Action } from './actions';

export type Map = 'Fall' | 'Winter' | 'Lake' | 'Mountain';

export type Deck = 'Standard' | 'E&P';

export enum Suit {
  Bird = 'B',
  Fox = 'F',
  Mouse = 'M',
  Rabbit = 'R'
}

export enum Faction {
  Marquise = 'C',
  Eyrie = 'E',
  Woodland = 'A',
  Vagabond = 'V',
  Vagabond2 = 'G',
  Cult = 'L',
  Riverfolk = 'O',
  Duchy = 'D',
  Corvid = 'P'
}

export enum Piece {
  Warrior = 'w',
  Pawn = 'p',
  Building = 'b',
  Token = 't',
  Raft = 'r'
}

export enum Item {
  Sword = 's',
  Bag = 'b',
  Coin = 'c',
  Crossbow = 'x',
  Hammer = 'h',
  Tea = 't',
  Torch = 'r',
  Boot = 'f'
}

export enum ItemState {
  FaceUp = 'r',
  FaceDown = 'e'
}

export enum MarquiseSpecial {
  Sawmill = 'b_s',
  Workshop = 'b_w',
  Recruiter = 'b_r',
  Keep = 't_k',
  Wood = 't'
}

export enum EyrieSpecial {
  Recruit = 'r',
  Move = 'm',
  Battle = 'x',
  Build = 'b'
}

export enum WoodlandSpecial {
  FoxBase = 'b_f',
  RabbitBase = 'b_r',
  MouseBase = 'b_m'
}

export enum VagabondItemSpecial {
  Satchel = 's',
  Damaged = 'd',
  Track = 't'
}

export enum VagabondRelationshipStatus {
  Hostile = 'h',
  Indifferent = '0',
  IndifferentPlusOne = '1',
  IndifferentPlusTwo = '2',
  Allied = 'a'
}

export enum RiverfolkSpecial {
  FoxPost = 't_f',
  RabbitPost = 't_r',
  MousePost = 't_m'
}

export enum RiverfolkPriceSpecial {
  HandCard = 'h',
  Riverboats = 'r',
  Mercenaries = 'm'
}

export enum LizardSpecial {
  FoxGarden = 'b_f',
  RabbitGarden = 'b_r',
  MouseGarden = 'b_m'
}

export enum DuchySpecial {
  Citadel = 'b_c',
  Market = 'b_m',
  Burrow = '0'
}

export enum CorvidSpecial {
  Plot = 't',
  BombPlot = 't_b',
  SnarePlot = 't_s',
  RaidPlot = 't_r',
  ExtortionPlot = 't_e'
}

export enum Card {

  // all decks
  Ambush = 'amb',
  Dominance = 'dom',

  // base deck
  Armor = 'armor',
  BetterBurrowBank = 'bank',
  BrutalTactics = 'brutal',
  CommandWarren = 'command',
  Cob = 'cob',
  Codebreakers = 'codeb',
  FoxFavor = 'favorf',
  MouseFavor = 'favorm',
  RabbitFavor = 'favorr',
  Royal = 'royal',
  Sappers = 'sap',
  Scout = 'scout',
  StandAndDeliver = 'stand',
  Tax = 'tax',

  // exiles and partisans
  Boat = 'boat',
  CharmOffensive = 'charm',
  CoffinMakers = 'coffin',
  CombatPlans = 'cplans',
  EyrieEmigre = 'emi',
  FalseOrders = 'false',
  FoxPartisans = 'fpart',
  RabbitPartisans = 'rpart',
  MousePartisans = 'mpart',
  Informers = 'inform',
  LeagueOfExtraordinaryMice = 'league',
  Engrave = 'engrave',
  MurineBroker = 'murine',
  PropagandaBureau = 'prop',
  Saboteurs = 'sabo',
  SoupKitchens = 'soup',
  SwapMeet = 'swap',
  Tun = 'tun'
}

export enum QuestCard {
  Errand = 'errand',
  Bandits = 'bandits',
  Bear = 'bear',
  Escort = 'escort',
  Funds = 'funds',
  Speech = 'speech',
  Guard = 'guard',
  Logs = 'logs',
  Shed = 'shed'
}

export interface Turn {
  taker: Faction;
  actions: Action[];
}

export interface RootGame {
  
  map: Map;                                     // the map the game takes place on
  deck: Deck;                                   // the deck used for the game
  clearings?: Suit[];                           // the suits for each clearing [1..12] (not necessary for fall, because it has a fixed suit order)
  pool?: Faction[];                             // the faction pool (if using a draft)
  players: Partial<Record<Faction, string>>;    // { [factionkey]: player }
  turns: Turn[];                                // all of the game turns in order
  winner: string;                               // the winner of the game

}