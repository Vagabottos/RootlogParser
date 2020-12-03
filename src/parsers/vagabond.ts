import { Action } from '../interfaces';

export function parseVagabondAction(action: string): Action {
  console.error(`Could not parse Vagabond action: "${action}" - no handlers for this.`);
  return null;
}