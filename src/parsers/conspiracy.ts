import { Action } from '../interfaces';

export function parseConspiracyAction(action: string): Action {
  console.error(`Could not parse Conspiracy action: "${action}" - no handlers for this.`);
  return null;
}