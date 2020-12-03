import { Action } from '../interfaces';

export function parseMarquiseAction(action: string): Action {
  console.error(`Could not parse Marquise action: "${action}" - no handlers for this.`);
  return null;
}