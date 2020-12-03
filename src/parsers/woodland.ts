import { Action } from '../interfaces';

export function parseWoodlandAction(action: string): Action {
  console.error(`Could not parse Woodland action: "${action}" - no handlers for this.`);
  return null;
}