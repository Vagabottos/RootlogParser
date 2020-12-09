import { CardName, Suit } from "../interfaces";

const extendedCardNames = new Map([
  ['@', 'Ambush'],
  ['dom', 'dominance'],

  // base deck
  ['armor', 'armorers'],
  ['bank', 'betterburrowbank'],
  ['brutal', 'brutaltactics'],
  ['command', 'commandwarren'],
  ['cob', 'cobbler'],
  ['codeb', 'codebreakers'],
  ['ffavor', 'favorofthefoxes'],
  ['mfavor', 'favorofthemice'],
  ['rfavor', 'favoroftherabbits'],
  ['royal', 'royalclaim'],
  ['sap', 'sappers'],
  ['scout', 'scoutingparty'],
  ['stand', 'standanddeliver'],
  ['tax', 'taxcollectors'],

  // exiles and partisans
  ['boat', 'boatbuilders'],
  ['charm', 'charmoffensive'],
  ['coffin', 'coffinmakers'],
  ['cplans', 'corvidplanners'],
  ['emi', 'eyrieemigre'],
  ['false', 'falseorders'],
  ['fpart', 'foxpartisans'],
  ['rpart', 'rabbitpartisans'],
  ['mpart', 'mousepartisans'],
  ['inform', 'informants'],
  ['league', 'leagueofextraordinarymice'],
  ['engrave', 'masterengravers'],
  ['murine', 'murinebrokers'],
  ['prop', 'propagandabureau'],
  ['sabo', 'saboteurs'],
  ['soup', 'soupkitchens'],
  ['swap', 'swapmeet'],
  ['tun', 'tunnels']
]);

export function extendCardName(cardName: CardName, suit: Suit): CardName {
  if (cardName === 'favor') {
    if (suit === 'F') {
      return 'favorofthefoxes' as CardName;
    } else if (suit === 'R') {
      return 'favoroftherabbits' as CardName;
    } else if (suit === 'M') {
      return 'favorofthemice' as CardName;
    }
  }
   return (extendedCardNames.get(cardName) || cardName) as CardName;
}