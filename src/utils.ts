import { flow, thru, upperFirst } from "lodash";
import { leagues } from "./consts";

export const addMouseDownListener = <N>(
  node: N, 
  type: "mousedown", 
  listener: N extends { addEventListener: (type: "mousedown", listener: (this: N, ev: MouseEvent) => any) => void; } 
    ? (this: N, ev: MouseEvent) => any : never
): (() => void) => {
  (node as any).addEventListener(type, listener);
  return () => (node as any).removeEventListener(type, listener);
};

export const getCurrentSeason = () => flow(
  (date: Date) => ({ month: date.getMonth(), year: date.getFullYear() }),
  v => v.month > 5 ? v.year : v.year - 1
)(new Date());

export const getCountryByLeagueId = (id: number) => thru(leagues.find(v => v.id === id)?.country, v => v ? upperFirst(v) : "unknown country");