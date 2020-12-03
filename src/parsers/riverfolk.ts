import { Action } from '../interfaces';

export function parseRiverfolkAction(action: string): Action {
  console.error(`Could not parse Riverfolk action: "${action}" - no handlers for this.`);
  return null;
}