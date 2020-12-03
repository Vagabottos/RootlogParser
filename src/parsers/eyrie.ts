import { Action } from '../interfaces';

export function parseEyrieAction(action: string): Action {
  console.error(`Could not parse Eyrie action: "${action}" - no handlers for this.`);
  return null;
}