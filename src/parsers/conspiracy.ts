import { Action } from '../interfaces';
import { formRegex } from '../utils/regex-former';

const FLIP_PLOT_REGEX = formRegex('t<Clearing|||plotClearing>^<Piece|||plotFlipped>');
const TRICK_PLOT_REGEX = formRegex('t<Clearing|||firstClearing><->t<Clearing|||secondClearing>');

export function parseConspiracyAction(action: string): Action {

  if (FLIP_PLOT_REGEX.test(action)) {
    const result = action.match(FLIP_PLOT_REGEX);

    return {
      plot: result.groups.plotFlipped,
      clearing: +result.groups.plotClearing
    };
  }

  if (TRICK_PLOT_REGEX.test(action)) {
    const result = action.match(TRICK_PLOT_REGEX);

    return {
      clearings: [+result.groups.firstClearing, +result.groups.secondClearing]
    };
  }

  return null;

}
