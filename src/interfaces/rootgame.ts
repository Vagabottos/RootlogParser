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

export interface Piece {
  faction: Faction;
  pieceType: PieceType
}

export enum PieceType {
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

export enum EyrieLeaderSpecial {
  Builder = 'builder',
  Charismatic = 'charismatic',
  Commander = 'commander',
  Despot = 'despot'
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

export enum VagabondCharacterSpecial {
  Arbiter = 'arbiter',
  Adventurer = 'adventurer',
  Harrier = 'harrier',
  Ranger = 'ranger',
  Ronin = 'ronin',
  Scoundrel = 'scoundrel',
  Thief = 'thief',
  Tinker = 'tinker',
  Vagrant = 'vagrant'
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

export enum LizardOutcastSpecial {
  Outcast = 'o',
  HatedOutcast = 'ho'
}

export enum DuchySpecial {
  Citadel = 'b_c',
  Market = 'b_m',
  Burrow = '0'
}

export enum DuchyMinisterSpecial {
  Captain = 'captain',
  Marshal = 'marshal',
  Foremole = 'foremole',
  Banker = 'banker',
  Brigadier = 'brigadier',
  Mayor = 'mayor',
  Baron = 'baronofdirt',
  Duchess = 'duchessofmud',
  Earl = 'earlofstone'
}

export enum CorvidSpecial {
  Plot = 't',
  BombPlot = 't_b',
  SnarePlot = 't_s',
  RaidPlot = 't_r',
  ExtortionPlot = 't_e'
}

export enum CardName {

  // all decks
  Ambush = '@',
  AmbushFullName = 'ambush',
  Dominance = 'dom',
  DominanceFullName = 'dominance',
  Anvil = 'anvil',
  ArmsTrader = 'armstrader',
  BakeSale = 'bakesale',
  BirdyBindle = 'birdybindle',
  Crossbow = 'crossbow',
  FoxfolkSteel = 'foxfolksteel',
  GentlyUsedKnapsack = 'gentlyusedknapsack',
  Investments = 'investments',
  MouseInASack = 'mouseinasack',
  ProtectionRacket = 'protectionracket',
  RootTea = 'roottea',
  SmugglersTrail = 'smugglerstrail',
  Sword = 'sword',
  TravelGear = 'travelgear',
  WoodlandRunners = 'woodlandrunners',

  // base deck
  Armor = 'armor',
  ArmorFullName = 'armorers',
  BetterBurrowBank = 'bank',
  BetterBurrowBankFullName = 'betterburrowbank',
  BrutalTactics = 'brutal',
  BrutalTacticsFullName = 'brutaltactics',
  CommandWarren = 'command',
  CommandWarrenFullName = 'commandwarren',
  Cob = 'cob',
  CobFullName = 'cobbler',
  Codebreakers = 'codeb',
  CodebreakersFullName = 'codebreakers',
  FoxFavor = 'ffavor',
  FoxFavorFullName = 'favorofthefoxes',
  MouseFavor = 'mfavor',
  MouseFavorFullName = 'favorofthemice',
  RabbitFavor = 'rfavor',
  RabbitFavorFullName = 'favoroftherabbits',
  GenericFavor = 'favor',
  Royal = 'royal',
  RoyalFullName = 'royalclaim',
  Sappers = 'sap',
  SappersFullName = 'sappers',
  Scout = 'scout',
  ScoutFullName = 'scoutingparty',
  StandAndDeliver = 'stand',
  StandAndDeliverFullName = 'standanddeliver',
  Tax = 'tax',
  TaxFullName = 'taxcollectors',

  // exiles and partisans
  Boat = 'boat',
  BoatFullName = 'boatbuilders',
  CharmOffensive = 'charm',
  CharmOffensiveFullName = 'charmoffensive',
  CoffinMakers = 'coffin',
  CoffinMakersFullName = 'coffinmakers',
  CorvidPlans = 'cplans',
  CorvidPlansFullName = 'corvidplanners',
  EyrieEmigre = 'emi',
  EyrieEmigreFullName = 'eyrieemigre',
  FalseOrders = 'false',
  FalseOrdersFullName = 'falseorders',
  FoxPartisans = 'fpart',
  FoxPartisansFullName = 'foxpartisans',
  RabbitPartisans = 'rpart',
  RabbitPartisansFullName = 'rabbitpartisans',
  MousePartisans = 'mpart',
  MousePartisansFullName = 'mousepartisans',
  Informers = 'inform',
  InformersFullName = 'informants',
  LeagueOfExtraordinaryMice = 'league',
  LeagueOfExtraordinaryMiceFullName = 'leagueofextraordinarymice',
  Engrave = 'engrave',
  EngraveFullName = 'masterengravers',
  MurineBroker = 'murine',
  MurineBrokerFullName = 'murinebrokers',
  PropagandaBureau = 'prop',
  PropagandaBureauFullName = 'propagandabureau',
  Saboteurs = 'sabo',
  SaboteursFullName = 'saboteurs',
  SoupKitchens = 'soup',
  SoupKitchensFullName = 'soupkitchens',
  SwapMeet = 'swap',
  SwapMeetFullName = 'swapmeet',
  Tun = 'tun',
  TunFullName = 'tunnels'
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

export const SpecialCardName = Object.assign({}, EyrieLeaderSpecial, VagabondCharacterSpecial, DuchyMinisterSpecial);
export type SpecialCardName = typeof SpecialCardName;

// TODO: Might need this, unsure
// export interface Location {
//     index?: Number,                   // Clearing
//     surroundingClearings?: Number[],  // Forest
//     faction: Faction,                 // Supply or Hand
//     // itemState
// }

export interface Card {
    suit?: Suit,
    cardName?: string
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
  winner: Faction[];                            // the winner(s) of the game

}