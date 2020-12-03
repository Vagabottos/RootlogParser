import { Action } from '../interfaces';

export function parseDuchyAction(action: string): Action {
  console.error(`Could not parse Duchy action: "${action}" - no handlers for this.`);
  return null;
}