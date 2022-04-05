import { Position, Settings } from "./types";

export const settings: Settings = {
  dashboardMode: {
    brief: "brief",
    full: "full",
  },
};

export const positions: Position[] = [
  {
    id: "1",
    value: "Goalkeeper",
    short: "GK",
  }, 
  {
    id: "2",
    value: "Sweeper",
    short: "SW",
  },
  {
    id: "3",
    value: "Left full-back",
    short: "LFB",
  },
  {
    id: "4",
    value: "Centre-back",
    short: "CB",
  },
  {
    id: "5",
    value: "Right full-back",
    short: "RFB",
  },
  {
    id: "6",
    value: "Left wing-back",
    short: "LWB",
  },
  {
    id: "7",
    value: "Defensive midfielder",
    short: "DM",
  },
  {
    id: "8",
    value: "Right wing-back",
    short: "RWB",
  },
  {
    id: "9",
    value: "Left midfielder",
    short: "LM",
  },
  {
    id: "10",
    value: "Centre midfielder",
    short: "CM",
  },
  {
    id: "11",
    value: "Right midfielder",
    short: "RM",
  },
  {
    id: "12",
    value: "Attacking midfielder",
    short: "AM",
  },
  {
    id: "13",
    value: "Left forward",
    short: "LF",
  },
  {
    id: "14",
    value: "Centre forward",
    short: "CF",
  },
  {
    id: "15",
    value: "Right forward",
    short: "RF",
  },
];

export const addMouseDownListener = <N>(
  node: N, 
  type: "mousedown", 
  listener: N extends { addEventListener: (type: "mousedown", listener: (this: N, ev: MouseEvent) => any) => void; } 
    ? (this: N, ev: MouseEvent) => any : never
): (() => void) => {
  (node as any).addEventListener(type, listener);
  return () => (node as any).removeEventListener(type, listener);
};
