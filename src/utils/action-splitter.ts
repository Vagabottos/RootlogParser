const GROUPING_REGEX = new RegExp(`\\((.+)\\)(.+)`);

/**
 * If the action passed to this function is composite, e.g., (2%c+%h)$V->d, it decomposes it into an array of equivalent actions
 * If not, it simply returns the same action in an array
 * This makes parsing the regexes significantly easier, and lets us continue to use named regexes
 * @param action The action to decompose
 * @example
 * // returns ['2%c$V->d', '%h$V->d']
 * splitAction('(2%c+%h)$V->d')
 * @example
 * // returns ['t1->', 't2->', 't5->']
 * splitAction('t1+t2+t5->')
 */
export function splitAction(action: string): string[] {
  // Don't split actions that contain '++', because these actions can never be composite
  if (action.includes('++')) {
    return [action];
  }
  // Don't split actions that don't contain '+', because these actions are by definition not composite
  if (!action.includes('+')) {
    return [action];
  }

  // Test if the action involves some text enclosed in parentheses, followed by some text that isn't
  // If so, this is grouping components
  if (GROUPING_REGEX.test(action)) {
    const [_, grouped, outerTerm] = action.match(GROUPING_REGEX);
    return grouped.split('+').map(g => `${g}${outerTerm}`);
  } else {
    // The action contains a '+' but no text enclosed in parentheses
    // This means this is grouping movement or revealing
    const match = action.match(/(?<lhs>.*[^<])(?<delim>->|\^)(?<rhs>.*)/);
    let [lhs, rhs, delim] = (match == null) ? [action, '', ''] : [match.groups.lhs, match.groups.rhs, match.groups.delim];
  
    if (lhs.includes('+')) {
      return lhs.split('+').map(component => `${component}${delim}${rhs}`);
    } else {
      return rhs.split('+').map(component => `${lhs}${delim}${component}`);
    }
  }
}
