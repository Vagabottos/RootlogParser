import { CardName, Faction, Item, ItemState, Piece, Suit } from '../interfaces';

const DIVIDER_BEFORE_GROUP_NAME = '|||';  // arbitrarily chosen to be a divider that will never appear in Rootlog code

const ALL_FACTIONS = `[${Object.values(Faction).join('')}]`;          // [CEAVGLODP]
const ALL_SUITS = `[${Object.values(Suit).join('')}]`;                // [BFMR]
const ALL_ITEM_TYPES = `[${Object.values(Item).join('')}]`;           // [sbcxhtrf]
const ALL_PIECE_TYPES = `[${Object.values(Piece).join('')}]`;         // [wpbtr]
const ALL_ITEM_STATE = `[${Object.values(ItemState).join('')}]`;      // [re]
const ALL_CARD_NAMES = `(${Object.values(CardName).join('|')})`;      // (@|dom|armor|bank|...|tun)

const CLEARING = '(1[0-2]|[1-9])';                                    // a number from 1-12
const FOREST = `(${CLEARING}(_${CLEARING}){2,})`;                     // 3+ adjacent clearings, separated by underscores
const FACTION_BOARD = `(${ALL_FACTIONS}?\\$)`;                        // $, optionally preceeded by a faction
const HAND = `(${ALL_FACTIONS})`;                                     // A faction

// In order from most-to-least specific
const ALL_LOCATIONS = `(${FOREST}|${CLEARING}|${FACTION_BOARD}|${HAND}|${ALL_ITEM_STATE})`;

// [Faction]<PieceType>[_<subtype>],  subtype must be one letter
const PIECE_REGEX_STRING = `(${ALL_FACTIONS})?(${ALL_PIECE_TYPES})(_[a-z])?`;
// [Suit]#[CardName]
const CARD_REGEX_STRING = `(${ALL_SUITS})?#${ALL_CARD_NAMES}?`;
// %<ItemType> or %_ to represent 'all items'
const ITEM_REGEX_STRING = `(%${ALL_ITEM_TYPES}|%_)`;
// a card, piece, or item
const COMPONENT_REGEX_STRING = `(${CARD_REGEX_STRING}|${PIECE_REGEX_STRING}|${ITEM_REGEX_STRING})`;

// base should be of the format 'code|||name' or else just 'code'
// ex: 'number|||amountOfPoints',  'piece'
const parseForRegexString = function(str: string): string {
  const [groupCode, groupName] = str.split(DIVIDER_BEFORE_GROUP_NAME);

  switch (groupCode.toLowerCase()) {
    case ('number'):
      return _parseForRegexString('\\d*', groupName);
    case ('piece'):
      return _parseForRegexString(PIECE_REGEX_STRING, groupName);
    case ('card'):
      return _parseForRegexString(CARD_REGEX_STRING, groupName);
    case ('item'):
      return _parseForRegexString(ITEM_REGEX_STRING, groupName);
    case ('component'):
      return _parseForRegexString(COMPONENT_REGEX_STRING, groupName);
    case ('clearing'):
      return _parseForRegexString(CLEARING, groupName);
    case ('factionboard'):
      return _parseForRegexString(FACTION_BOARD, groupName);
    case ('location'):
      return _parseForRegexString(ALL_LOCATIONS, groupName);
    case ('craftable'):
      return _parseForRegexString(`(${ALL_CARD_NAMES}|${ITEM_REGEX_STRING})`, groupName);
    case ('suit'):
      return _parseForRegexString(ALL_SUITS, groupName);
    case ('faction'):
      return _parseForRegexString(ALL_FACTIONS, groupName);
    case ('roll'):
      return _parseForRegexString(`[0-3]`, groupName);
    default:
      return _parseForRegexString(groupCode, groupName);
    }
}

const _parseForRegexString = function(parsedRegex: string, groupName: string): string {
  // if we have a group name, return `(?<groupName>regex)`, else return `(regex)`
  return groupName !== undefined ? `(?<${groupName}>${parsedRegex})` : `(${parsedRegex})`;
}

// given a pseudo-regex, form a valid regex
// ex: `Z<Craftable>` returns `Z((@|dom|armor|bank|...|tun)|(%[bcthxsrf]|%_))`
// Note that this function WILL NOT WORK on composite actions, like (t1+t2)->5
// Please first call the action splitter to turn the composite action into an array of individual actions
export function formRegex(pseudoRegex: string): RegExp {
  // Left-hand side: All characters until the divider. It cannot end with < (To avoid treating <-> from trick as a -> divider)
  // Divider: -> or ^
  // Right-hand side: All remaining characters in the string
  const match = pseudoRegex.match(/(?<lhs>.*[^<])(?<delim>->|\^)(?<rhs>.*)/);
  let [lhs, rhs, delim] = (match == null) ? [pseudoRegex, '', ''] : [match.groups.lhs, match.groups.rhs, match.groups.delim];
  if (delim === '^') {
    delim = '\\^';  // We have to escape the special regex character to treat it as a literal
  }

  let finalParsedRegexString = '';

  [lhs, rhs].forEach((splitString, matchIdx) => {
    if (splitString == null) {
      return;  // TODO: Test? This seems wrong...
    }

    let parsedRegexString = '';
    let nestedStrings = [];
    let currentString = '';
    let openOptionalSections = 0;
    let openMandatorySections = 0;

    if (matchIdx === 1) {
      finalParsedRegexString += delim;  // Re-add the removed delimiter after forming the left-hand side
    }

    [...splitString].forEach((c, idx) => {
      switch (c) {
        case '[':
          if (openOptionalSections === 0 && openMandatorySections === 0) {
            // We are not nested in brackets, so what was written up to this point was literal text
            parsedRegexString += currentString;
          } else {
            // We *are* nested in brackets
            // Store the currentString in nested strings to resume working on after we close this new optional
            nestedStrings.push(currentString);
          }
          currentString = '';
          openOptionalSections++;
          break;
        case ']':
          if (openOptionalSections === 0) {
            // This was not preceeded by a '[', so this isn't a syntax bracket. It's a literal ']' character
            currentString += c;
          } else if (nestedStrings.length === 0) {
            // We are not nested in brackets. Resume parsing with an empty literal string
            parsedRegexString += `${parseForRegexString(currentString)}?`;
            currentString = '';
            openOptionalSections--;
          } else {
            // We are nested in brackets. Resume working on the previous literal string
            currentString = `${nestedStrings.pop()}${parseForRegexString(currentString)}?`;
            openOptionalSections--;
          }
          break;
        case '<':
          // if the next two characters of the string are ->, so we have '<->', treat this as a literal '>' character,
          // not a syntax bracket
          if (splitString.length > idx + 1 && splitString[idx+1] === '-' && splitString[idx+2] === '>') {
            currentString += c;
            break;
          } else if (openOptionalSections === 0 && openMandatorySections === 0) {
            // We are not nested in brackets, so what was written up to this point was literal text
            parsedRegexString += currentString;
          } else {
            // We *are* nested in brackets
            // Store the currentString in nested strings to resume working on after we close this new optional
            nestedStrings.push(currentString);
          }
          currentString = '';
          openMandatorySections++;
          break;
        case '>':
          if (openMandatorySections === 0) {
            // This was not preceeded by a '<', so this isn't a syntax bracket. It's a literal '>' character
            currentString += c;
          } else if (nestedStrings.length === 0) {
            // We are not nested in brackets. Resume parsing with an empty literal string
            parsedRegexString += parseForRegexString(currentString);
            currentString = '';
            openMandatorySections--;
          } else {
            // We are nested in brackets. Resume working on the previous literal string
            currentString = `${nestedStrings.pop()}${parseForRegexString(currentString)}`;
            openMandatorySections--;
          }
          break;
        case "(":
        case ")":
        case "+":
        case "?":
        case "^":
          currentString += `\\${c}`;
          break;
        default:
          currentString += c;
      }
    });
    parsedRegexString += currentString;
    finalParsedRegexString += parsedRegexString;
  });
  return new RegExp(`^${finalParsedRegexString}$`);
}
