import { Action } from '../interfaces';

export function parseCultAction(action: string): Action {
  console.error(`Could not parse Cult action: "${action}" - no handlers for this.`);
  return null;
}