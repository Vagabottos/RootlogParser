import { Action } from './actions';

export type RootMap = 'Fall' | 'Winter' | 'Lake' | 'Mountain';

export type RootDeck = 'Standard' | 'E&P';

export enum RootSuit {
  Bird = 'B',
  Fox = 'F',
  Mouse = 'M',
  Rabbit = 'R'
}

export enum RootFaction {
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

export interface RootPiece {
  faction: RootFaction;
  pieceType: RootPieceType;
}

export enum RootPieceType {
  Warrior = 'w',
  Pawn = 'p',
  Building = 'b',
  Token = 't',
  Raft = 'r'
}

export enum RootItem {
  Sword = 's',
  Bag = 'b',
  Coin = 'c',
  Crossbow = 'x',
  Hammer = 'h',
  Tea = 't',
  Torch = 'r',
  Boot = 'f'
}

export enum RootItemState {
  FaceUp = 'r',
  FaceDown = 'e'
}

export enum RootMarquiseSpecial {
  Sawmill = 'b_s',
  Workshop = 'b_w',
  Recruiter = 'b_r',
  Keep = 't_k',
  Wood = 't'
}

export enum RootEyrieSpecial {
  Recruit = 'r',
  Move = 'm',
  Battle = 'x',
  Build = 'b'
}

export enum RootEyrieLeaderSpecial {
  Builder = 'builder',
  Charismatic = 'charismatic',
  Commander = 'commander',
  Despot = 'despot'
}

export enum RootWoodlandSpecial {
  FoxBase = 'b_f',
  RabbitBase = 'b_r',
  MouseBase = 'b_m'
}

export enum RootVagabondItemSpecial {
  Satchel = 's',
  Damaged = 'd',
  Track = 't'
}

export enum RootVagabondCharacterSpecial {
  Adventurer = 'adventurer',
  Arbiter = 'arbiter',
  Harrier = 'harrier',
  Ranger = 'ranger',
  Ronin = 'ronin',
  Scoundrel = 'scoundrel',
  Thief = 'thief',
  Tinker = 'tinker',
  Vagrant = 'vagrant'
}

export enum RootVagabondRelationshipStatus {
  Hostile = 'h',
  Indifferent = '0',
  IndifferentPlusOne = '1',
  IndifferentPlusTwo = '2',
  Allied = 'a'
}

export enum RootRiverfolkSpecial {
  FoxPost = 't_f',
  RabbitPost = 't_r',
  MousePost = 't_m'
}

export enum RootRiverfolkPriceSpecial {
  HandCard = 'h',
  Riverboats = 'r',
  Mercenaries = 'm'
}

export enum RootLizardSpecial {
  FoxGarden = 'b_f',
  RabbitGarden = 'b_r',
  MouseGarden = 'b_m'
}

export enum RootLizardOutcastSpecial {
  Outcast = 'o',
  HatedOutcast = 'ho'
}

export enum RootDuchySpecial {
  Citadel = 'b_c',
  Market = 'b_m',
  Burrow = '0'
}

export enum RootDuchyMinisterSpecial {
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

export enum RootCorvidSpecial {
  Plot = 't',
  BombPlot = 't_b',
  SnarePlot = 't_s',
  RaidPlot = 't_r',
  ExtortionPlot = 't_e'
}

export enum RootCardName {

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

export enum RootQuestCard {
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

export const RootSpecialCardName = Object.assign({}, RootEyrieLeaderSpecial, RootVagabondCharacterSpecial, RootDuchyMinisterSpecial);
export type RootSpecialCardName = typeof RootSpecialCardName;

export interface RootForest {
  clearings: number[];
}

export interface RootFactionBoard {
  faction: RootFaction;
}

// TODO: Add decree column, Vagabond board areas, quests
export type RootLocation = RootItemState | RootFaction | number | RootForest | RootFactionBoard | RootVagabondRelationshipStatus | string;

export interface RootCard {
    suit?: RootSuit;
    cardName?: string;
}

export interface RootTurn {
  taker: RootFaction;
  actions: Action[];
}

export interface RootGame {

  map: RootMap;                                     // the map the game takes place on
  deck: RootDeck;                                   // the deck used for the game
  clearings?: RootSuit[];                           // the suits for each clearing [1..12] (not necessary for fall, because it has a fixed suit order)
  pool?: RootFaction[];                             // the faction pool (if using a draft)
  players: Partial<Record<RootFaction, string>>;    // { [factionkey]: player }
  turns: RootTurn[];                                // all of the game turns in order
  winner: RootFaction[];                            // the winner(s) of the game

}